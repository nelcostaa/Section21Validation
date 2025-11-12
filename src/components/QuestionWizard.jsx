import { useReducer, useEffect } from 'react'
import QuestionCard from './QuestionCard'
import ProgressIndicator from './ProgressIndicator'
import { getQuestionById } from '../data/questionnaire'
import { getInitialQuestionId, processAnswer, isResultAction, getNextSequentialQuestionId, aggregateResultActions } from '../utils/questionLogic'

const initialState = {
  currentQuestionId: getInitialQuestionId(),
  answers: new Map(),
  pathHistory: [getInitialQuestionId()],
  result: null,
  invalidReason: null,
  pendingResults: []
}

const wizardReducer = (state, action) => {
  switch (action.type) {
    case 'ANSWER_QUESTION':
      const { questionId, answerValue } = action.payload
      const actionResult = processAnswer(questionId, answerValue)

      const newAnswers = new Map(state.answers)
      newAnswers.set(questionId, answerValue)

      if (isResultAction(actionResult)) {
        // Record the result action (include questionId) but continue through the questionnaire sequentially.
        const newPending = [...(state.pendingResults || []), { ...actionResult, questionId }]
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
          // No more questions: aggregate pending results to determine final outcome.
          const final = aggregateResultActions(newPending)
          return {
            ...state,
            answers: newAnswers,
            pathHistory: [...state.pathHistory, questionId],
            result: final.result,
            invalidReason: final.reasons || null,
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
    
    case 'RESET':
      return initialState
    
    default:
      return state
  }
}

const QuestionWizard = ({ onComplete }) => {
  const [state, dispatch] = useReducer(wizardReducer, initialState)
  
  const currentQuestion = getQuestionById(state.currentQuestionId)
  const selectedAnswer = state.answers.get(state.currentQuestionId)

  const handleAnswerSelect = (answerValue) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        questionId: state.currentQuestionId,
        answerValue
      }
    })
  }

  // Check if we have a result and notify parent
  useEffect(() => {
    if (state.result) {
      onComplete({
        result: state.result,
        reasons: state.invalidReason || [],
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
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <ProgressIndicator currentQuestionId={state.currentQuestionId} />
        <QuestionCard
          question={currentQuestion}
          selectedAnswer={selectedAnswer}
          onAnswerSelect={handleAnswerSelect}
        />
      </div>
    </div>
  )
}

export default QuestionWizard

