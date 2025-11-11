import { processAnswer, getInitialQuestionId } from '../src/utils/questionLogic.js'
import { questionnaire } from '../src/data/questionnaire.js'

describe('questionLogic basic', () => {
  test('initial question exists in questionnaire', () => {
    const id = getInitialQuestionId()
    const q = questionnaire.questions.find(q => q.id === id)
    expect(q).toBeDefined()
  })

  test('processAnswer returns action for known answer', () => {
    const action = processAnswer('1.1', true)
    expect(action).toBeDefined()
    expect(['next', 'result']).toContain(action.type)
  })
})


