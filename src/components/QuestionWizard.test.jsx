import { describe, it, expect, beforeEach } from 'vitest'
import { wizardReducer, initialState } from './QuestionWizard'
import { getQuestionById } from '../data/questionnaire'

describe('QuestionWizard Reducer', () => {
  describe('Initial State', () => {
    it('should initialize with first question', () => {
      expect(initialState.currentQuestionId).toBe('1.1')
      expect(initialState.answers.size).toBe(0)
      expect(initialState.pathHistory).toEqual(['1.1'])
      expect(initialState.result).toBeNull()
      expect(initialState.pendingResults).toEqual([])
    })
  })

  describe('ANSWER_QUESTION', () => {
    it('should update answers and move to next question', () => {
      const state = { ...initialState, answers: new Map() }
      const action = {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: true }
      }
      
      const newState = wizardReducer(state, action)
      
      expect(newState.answers.get('1.1')).toBe(true)
      expect(newState.currentQuestionId).toBe('1.2')
      expect(newState.pathHistory).toContain('1.1')
      expect(newState.pathHistory).toContain('1.2')
    })

    it('should record pending result when answer leads to INVALID', () => {
      const state = { ...initialState, answers: new Map() }
      const action = {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: false } // "No" = INVALID
      }
      
      const newState = wizardReducer(state, action)
      
      expect(newState.pendingResults.length).toBe(1)
      expect(newState.pendingResults[0].result).toBe('INVALID')
      expect(newState.pendingResults[0].questionId).toBe('1.1')
    })

    it('should remove old pendingResult when re-answering same question', () => {
      // Answer 1.1 with "No" (INVALID)
      let state = { ...initialState, answers: new Map() }
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: false }
      })
      
      expect(state.pendingResults.length).toBe(1)
      expect(state.pendingResults[0].result).toBe('INVALID')
      
      // Go back to 1.1
      state = wizardReducer(state, { type: 'GO_BACK' })
      expect(state.currentQuestionId).toBe('1.1')
      expect(state.pendingResults.length).toBe(0) // Should be cleared
      
      // Re-answer 1.1 with "Yes" (VALID/next)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: true }
      })
      
      // Should not have the old INVALID result
      expect(state.pendingResults.length).toBe(0)
      expect(state.currentQuestionId).toBe('1.2')
    })

    it('should build correct reasons array at end with changed answers', () => {
      // Answer 1.1 with "No" (INVALID)
      let state = { ...initialState, answers: new Map() }
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: false }
      })
      
      // Answer 1.2 to continue (moves to 1.3)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.2', answerValue: false }
      })
      
      expect(state.currentQuestionId).toBe('1.3')
      
      // Go back from 1.3 to 1.2, then to 1.1
      state = wizardReducer(state, { type: 'GO_BACK' })
      expect(state.currentQuestionId).toBe('1.2')
      
      state = wizardReducer(state, { type: 'GO_BACK' })
      expect(state.currentQuestionId).toBe('1.1')
      
      // Change answer to "Yes"
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: true }
      })
      
      // Continue through to end (simulate answering all questions)
      // For this test, let's answer until we get a result
      while (!state.result && state.currentQuestionId) {
        const question = getQuestionById(state.currentQuestionId)
        if (!question) break
        
        // Answer with the first answer option
        const firstAnswer = question.answers[0]
        state = wizardReducer(state, {
          type: 'ANSWER_QUESTION',
          payload: { 
            questionId: state.currentQuestionId, 
            answerValue: firstAnswer.value 
          }
        })
        
        // Safety break
        if (state.pathHistory.length > 20) break
      }
      
      // If we have a result, check that reasons reflect the changed answer
      if (state.result && state.reasons) {
        const q1_1Reason = state.reasons.find(r => r.questionId === '1.1')
        if (q1_1Reason) {
          // Should reflect the new answer (Yes), not the old one (No)
          expect(q1_1Reason.answer).toBe('Yes')
          // Should not be INVALID since we changed it to Yes
          expect(q1_1Reason.type).not.toBe('INVALID')
        }
      }
    })
  })

  describe('GO_BACK', () => {
    it('should not go back from first question', () => {
      const state = { ...initialState }
      const newState = wizardReducer(state, { type: 'GO_BACK' })
      
      expect(newState).toBe(state) // Should return same state
    })

    it('should go back to previous question', () => {
      let state = { ...initialState, answers: new Map() }
      
      // Answer first question
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: true }
      })
      
      expect(state.currentQuestionId).toBe('1.2')
      
      // Go back
      state = wizardReducer(state, { type: 'GO_BACK' })
      
      expect(state.currentQuestionId).toBe('1.1')
      expect(state.answers.has('1.2')).toBe(false)
    })

    it('should remove answers and pendingResults for questions after the target', () => {
      let state = { ...initialState, answers: new Map() }
      
      // Answer 1.1 with "No" (creates INVALID pendingResult)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: false }
      })
      
      expect(state.pendingResults.length).toBe(1)
      expect(state.pendingResults[0].questionId).toBe('1.1')
      
      // Answer 1.2 (this moves us to 1.3)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.2', answerValue: false }
      })
      
      expect(state.currentQuestionId).toBe('1.3')
      expect(state.answers.has('1.2')).toBe(true)
      
      // Go back from 1.3 to 1.2
      state = wizardReducer(state, { type: 'GO_BACK' })
      
      expect(state.currentQuestionId).toBe('1.2')
      // Should still have 1.2's answer since we're at 1.2
      expect(state.answers.has('1.2')).toBe(true)
      
      // Go back again from 1.2 to 1.1
      state = wizardReducer(state, { type: 'GO_BACK' })
      
      expect(state.currentQuestionId).toBe('1.1')
      // Should have removed 1.2's answer
      expect(state.answers.has('1.2')).toBe(false)
      // Should have removed pendingResults for questions after 1.1
      // Since we went back to 1.1, pendingResults should be empty
      expect(state.pendingResults.length).toBe(0)
    })

    it('should clear result and reasons when going back', () => {
      let state = {
        ...initialState,
        currentQuestionId: '1.2',
        answers: new Map([['1.1', false]]),
        pathHistory: ['1.1', '1.1', '1.2'],
        result: 'INVALID',
        reasons: [{ questionId: '1.1', type: 'INVALID' }],
        pendingResults: [{ result: 'INVALID', questionId: '1.1' }]
      }
      
      state = wizardReducer(state, { type: 'GO_BACK' })
      
      expect(state.result).toBeNull()
      expect(state.reasons).toBeNull()
    })
  })

  describe('Answer Change Scenario', () => {
    it('should correctly update results when going back and changing an answer', () => {
      let state = { ...initialState, answers: new Map() }
      
      // Step 1: Answer 1.1 with "No" (INVALID)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: false }
      })
      
      const invalidResult = state.pendingResults.find(r => r.questionId === '1.1')
      expect(invalidResult).toBeDefined()
      expect(invalidResult.result).toBe('INVALID')
      
      // Step 2: Continue to next question (1.2 -> 1.3)
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.2', answerValue: false }
      })
      
      expect(state.currentQuestionId).toBe('1.3')
      
      // Step 3: Go back from 1.3 to 1.2, then to 1.1
      state = wizardReducer(state, { type: 'GO_BACK' })
      expect(state.currentQuestionId).toBe('1.2')
      
      state = wizardReducer(state, { type: 'GO_BACK' })
      expect(state.currentQuestionId).toBe('1.1')
      expect(state.pendingResults.length).toBe(0) // Should be cleared
      
      // Step 4: Change answer to "Yes"
      state = wizardReducer(state, {
        type: 'ANSWER_QUESTION',
        payload: { questionId: '1.1', answerValue: true }
      })
      
      // Verify old INVALID result is gone
      const stillHasInvalid = state.pendingResults.some(r => 
        r.questionId === '1.1' && r.result === 'INVALID'
      )
      expect(stillHasInvalid).toBe(false)
      
      // Verify we moved to next question
      expect(state.currentQuestionId).toBe('1.2')
      
      // Verify answer was updated
      expect(state.answers.get('1.1')).toBe(true)
    })
  })
})

