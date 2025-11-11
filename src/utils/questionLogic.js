import { getQuestionById } from '../data/questionnaire'

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

