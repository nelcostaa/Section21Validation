import { useState, useEffect, useRef } from 'react'

const AnswerButton = ({ text, value, onClick, isSelected = false, answerType = null, questionId = null }) => {
  const [showFeedback, setShowFeedback] = useState(false)
  const previousQuestionIdRef = useRef(questionId)

  // Reset feedback when question changes
  useEffect(() => {
    if (previousQuestionIdRef.current !== questionId && questionId !== null) {
      setShowFeedback(false)
      previousQuestionIdRef.current = questionId
    }
  }, [questionId])

  // Keep feedback visible when selected
  useEffect(() => {
    if (isSelected) {
      setShowFeedback(true)
    }
  }, [isSelected])

  const handleClick = () => {
    setShowFeedback(true)
    onClick(value)
  }

  // Determine if answer is positive (continues) or negative (leads to invalid result)
  const isPositive = answerType === 'next'
  const isNegative = answerType === 'result'

  return (
    <button
      onClick={handleClick}
      className={`
        w-full py-4 px-6 rounded-lg font-medium text-left transition-all duration-200
        border-2 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden
        ${
          isSelected
            ? isNegative
              ? "bg-red-600 text-white border-red-600 focus:ring-red-500"
              : isPositive
              ? "bg-green-600 text-white border-green-600 focus:ring-green-500"
              : "bg-indigo-600 text-white border-indigo-600 focus:ring-indigo-500"
            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 focus:ring-indigo-500"
        }
        ${showFeedback && !isSelected ? (isNegative ? "border-red-400 bg-red-50" : isPositive ? "border-green-400 bg-green-50" : "") : ""}
      `}
      aria-pressed={isSelected}
    >
      <div className="flex items-center justify-between">
        <span>{text}</span>
        {(showFeedback || isSelected) && (
          <span className={`
            ml-3 flex-shrink-0 transition-all duration-300
            ${showFeedback && !isSelected ? 'animate-bounce' : ''}
          `}>
            {isNegative ? (
              // X icon for negative/invalid answers
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-red-600'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : isPositive ? (
              // Checkmark icon for positive/continuing answers
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-green-600'}`}
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            ) : null}
          </span>
        )}
      </div>
      {/* Subtle pulse effect on click */}
      {showFeedback && !isSelected && (
        <div className={`
          absolute inset-0 rounded-lg
          ${isNegative ? 'bg-red-200' : isPositive ? 'bg-green-200' : ''}
          opacity-30 animate-ping
        `} />
      )}
    </button>
  )
}

export default AnswerButton

