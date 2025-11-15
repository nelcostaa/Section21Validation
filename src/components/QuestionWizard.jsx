import { useReducer, useEffect, useRef } from 'react'
import QuestionCard from './QuestionCard'
import ProgressIndicator from './ProgressIndicator'
import { getQuestionById } from '../data/questionnaire'
import { getInitialQuestionId, processAnswer, isResultAction, getNextSequentialQuestionId, aggregateResultActions } from '../utils/questionLogic'

export const initialState = {
  currentQuestionId: getInitialQuestionId(),
  answers: new Map(),
  pathHistory: [getInitialQuestionId()],
  result: null,
  invalidReason: null,
  pendingResults: []
}

export const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION': {
      const { questionId, answerValue } = action.payload
      const actionResult = processAnswer(questionId, answerValue)

      const newAnswers = new Map(state.answers)
      newAnswers.set(questionId, answerValue)

      if (isResultAction(actionResult)) {
        // Remove any existing pendingResult for this questionId before adding new one
        const filteredPending = (state.pendingResults || []).filter(
          result => result.questionId !== questionId
        )
        // Record the result action (include questionId) but continue through the questionnaire sequentially.
        const newPending = [...filteredPending, { ...actionResult, questionId }]
        const nextSeq = getNextSequentialQuestionId(questionId)

        if (nextSeq) {
          return {
            ...state,
            answers: newAnswers,
            pendingResults: newPending,
            pathHistory: [...state.pathHistory, questionId, nextSeq],
            currentQuestionId: nextSeq
          }
        } else {
          // No more questions: build detailed reasons for all answered questions (durable source of truth)
          const answeredIds = Array.from(newAnswers.keys())
          const detailed = answeredIds.map((qid) => {
            const q = getQuestionById(qid)
            const val = newAnswers.get(qid)
            const selectedText = q?.answers?.find(a => a.value === val)?.text || String(val)
            let action = null
            try {
              action = processAnswer(qid, val)
            } catch (e) {
              action = null
            }

            if (action && action.type === 'result') {
              return {
                questionId: qid,
                sectionId: q?.sectionId || null,
                questionText: q?.questionText.replace(/\*\*(.*?)\*\*/g, '$1') || qid,
                answer: selectedText,
                type: action.result,
                reason: action.reason || null,
                actionToTake: action.actionToTake || null
              }
            }

            return {
              questionId: qid,
              sectionId: q?.sectionId || null,
              questionText: q?.questionText.replace(/\*\*(.*?)\*\*/g, '$1') || qid,
              answer: selectedText,
              type: 'VALID',
              reason: q?.learningPoint || null
            }
          })

          // decide final overall result by severity
          const final = aggregateResultActions(newPending)
          const overall = final.result

          return {
            ...state,
            answers: newAnswers,
            pathHistory: [...state.pathHistory, questionId],
            result: overall,
            invalidReason: null,
            reasons: detailed,
            pendingResults: newPending
          }
        }
      } else {
        return {
          ...state,
          currentQuestionId: actionResult.questionId,
          answers: newAnswers,
          pathHistory: [...state.pathHistory, questionId, actionResult.questionId]
        }
      }
    }
    
    case 'GO_BACK': {
      // Can't go back from the first question
      if (state.pathHistory.length <= 1) {
        return state
      }

      const currentQId = state.currentQuestionId
      
      // Find the last unique question that was answered (before current question)
      // We need to find the last question in pathHistory that has an answer and is not the current question
      let previousQuestionId = null
      let previousIndex = -1
      
      // Work backwards through pathHistory to find the last answered question
      for (let i = state.pathHistory.length - 1; i >= 0; i--) {
        const qId = state.pathHistory[i]
        // Skip the current question
        if (qId === currentQId) continue
        // If this question has an answer, it's our previous question
        if (state.answers.has(qId)) {
          previousQuestionId = qId
          previousIndex = i
          break
        }
      }

      // If we couldn't find a previous question, can't go back
      if (!previousQuestionId || previousIndex === -1) {
        return state
      }

      // Remove current question and everything after the previous question from pathHistory
      const newPathHistory = state.pathHistory.slice(0, previousIndex + 1)
      
      // Remove answers for current question and any questions that came after the previous one
      const newAnswers = new Map(state.answers)
      const questionsToRemove = state.pathHistory.slice(previousIndex + 1)
      questionsToRemove.forEach(qId => newAnswers.delete(qId))
      
      // Remove pendingResults for questions that are being removed
      // Also remove pendingResult for the question we're going back to (since user might change answer)
      const newPendingResults = state.pendingResults.filter(result => {
        return !questionsToRemove.includes(result.questionId) && 
               result.questionId !== previousQuestionId
      })

      return {
        ...state,
        currentQuestionId: previousQuestionId,
        answers: newAnswers,
        pathHistory: newPathHistory,
        pendingResults: newPendingResults,
        result: null,
        reasons: null
      }
    }
    
    case 'RESET':
      return initialState
    
    default:
      return state
  }
}

const QuestionWizard = ({ onComplete }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState)
  const pendingTransitionRef = useRef(null)
  
  const currentQuestion = getQuestionById(state.currentQuestionId)
  const selectedAnswer = state.answers.get(state.currentQuestionId)

  const handleAnswerSelect = (answerValue) => {
    // Clear any pending transition
    if (pendingTransitionRef.current) {
      clearTimeout(pendingTransitionRef.current)
    }

    // Capture current questionId at click time to avoid stale closure issues
    const currentQuestionId = state.currentQuestionId

    // Show feedback for 1 second, then transition to next question
    pendingTransitionRef.current = setTimeout(() => {
      dispatch({
        type: 'ANSWER_QUESTION',
        payload: {
          questionId: currentQuestionId,
          answerValue
        }
      })
      pendingTransitionRef.current = null
    }, 1000)
  }

  const handleGoBack = () => {
    // Clear any pending transition
    if (pendingTransitionRef.current) {
      clearTimeout(pendingTransitionRef.current)
      pendingTransitionRef.current = null
    }
    dispatch({ type: 'GO_BACK' })
  }

  const canGoBack = state.pathHistory.length > 1 && state.currentQuestionId !== getInitialQuestionId()

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pendingTransitionRef.current) {
        clearTimeout(pendingTransitionRef.current)
      }
    }
  }, [])

  // Check if we have a result and notify parent
  useEffect(() => {
    if (state.result) {
      onComplete({
        result: state.result,
        reasons: state.reasons || [],
        answers: Object.fromEntries(state.answers),
        pathHistory: state.pathHistory
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.result])

  // Show loading/result state while transitioning
  if (state.result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing result...</p>
        </div>
      </div>
    )
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Question not found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#fff8f2' }}>
      <div className="max-w-3xl mx-auto">
        <ProgressIndicator currentQuestionId={state.currentQuestionId} />
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
          onGoBack={handleGoBack}
          canGoBack={canGoBack}
        />
      </div>
    </div>
  )
}

export default QuestionWizard

