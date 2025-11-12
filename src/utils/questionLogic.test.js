import { describe, it, expect } from 'vitest'
import { aggregateResultActions, getNextSequentialQuestionId } from './questionLogic'
import { questionnaire } from '../data/questionnaire'

describe('questionLogic helpers', () => {
  it('getNextSequentialQuestionId returns next id in questionnaire order', () => {
    const first = questionnaire.questions[0].id
    const second = questionnaire.questions[1].id
    expect(getNextSequentialQuestionId(first)).toBe(second)
    const last = questionnaire.questions[questionnaire.questions.length - 1].id
    expect(getNextSequentialQuestionId(last)).toBeNull()
  })

  it('aggregateResultActions aggregates multiple result actions and preserves reasons', () => {
    const actions = [
      { result: 'INVALID', reason: 'Missing certificate', questionId: '4.2' },
      { result: 'GREY_AREA', reason: 'Edge case about tenancy dates', questionId: '2.1' },
      { result: 'VALID', reason: 'Form 6A used', questionId: '6.1' }
    ]
    const aggregated = aggregateResultActions(actions)
    expect(aggregated.result).toBe('INVALID')
    expect(Array.isArray(aggregated.reasons)).toBe(true)
    expect(aggregated.reasons.length).toBe(3)
    expect(aggregated.reasons[0].type).toBe('INVALID')
    expect(aggregated.reasons[1].type).toBe('GREY_AREA')
    expect(aggregated.reasons[2].type).toBe('VALID')
  })
})


