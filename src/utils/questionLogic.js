import { getQuestionById, questionnaire } from '../data/questionnaire'

/**
 * Processes an answer and returns the next action
 * @param {string} questionId - Current question ID
 * @param {boolean} answerValue - The answer value (true/false)
 * @returns {Object} Action object with type and next question/result
 */
export const processAnswer = (questionId, answerValue) => {
  const question = getQuestionById(questionId)
  
  if (!question) {
    throw new Error(`Question ${questionId} not found`)
  }

  // Find the matching answer
  const answer = question.answers.find(a => a.value === answerValue)
  
  if (!answer) {
    throw new Error(`Answer not found for question ${questionId} with value ${answerValue}`)
  }

  return answer.action
}

/**
 * Gets the initial question ID
 * @returns {string} First question ID
 */
export const getInitialQuestionId = () => {
  return "1.1"
}

/**
 * Determines if an action leads to a result
 * @param {Object} action - Action object
 * @returns {boolean}
 */
export const isResultAction = (action) => {
  return action.type === "result"
}

/**
 * Determines if an action leads to another question
 * @param {Object} action - Action object
 * @returns {boolean}
 */
export const isNextQuestionAction = (action) => {
  return action.type === "next"
}

/**
 * Get the next question id in the linear questionnaire order.
 * Returns null when at the last question.
 */
export const getNextSequentialQuestionId = (questionId) => {
  const idx = questionnaire.questions.findIndex(q => q.id === questionId)
  if (idx === -1) return null
  if (idx + 1 < questionnaire.questions.length) return questionnaire.questions[idx + 1].id
  return null
}

/**
 * Aggregate a list of result actions into a single final result.
 * Severity order: INVALID > GREY_AREA > VALID
 */
export const aggregateResultActions = (actions) => {
  if (!actions || actions.length === 0) return { result: 'VALID', reasons: [] }

  const invalids = actions.filter(a => a.result === 'INVALID').map(a => ({ type: 'INVALID', reason: a.reason || null, questionId: a.questionId || null }))
  const greys = actions.filter(a => a.result === 'GREY_AREA').map(a => ({ type: 'GREY_AREA', reason: a.reason || null, questionId: a.questionId || null }))
  const valids = actions.filter(a => a.result === 'VALID').map(a => ({ type: 'VALID', reason: a.reason || null, questionId: a.questionId || null }))

  let final = 'VALID'
  if (invalids.length > 0) final = 'INVALID'
  else if (greys.length > 0) final = 'GREY_AREA'

  const reasons = [...invalids, ...greys, ...valids]
  return { result: final, reasons }
}

