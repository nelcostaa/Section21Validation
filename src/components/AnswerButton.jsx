const AnswerButton = ({ text, value, onClick, isSelected = false }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        w-full py-4 px-6 rounded-lg font-medium text-left transition-all duration-200
        border-2 focus:outline-none focus:ring-2 focus:ring-offset-2
        ${
          isSelected
            ? "bg-indigo-600 text-white border-indigo-600 focus:ring-indigo-500"
            : "bg-white text-gray-700 border-gray-300 hover:border-indigo-400 hover:bg-indigo-50 focus:ring-indigo-500"
        }
      `}
      aria-pressed={isSelected}
    >
      {text}
    </button>
  )
}

export default AnswerButton

