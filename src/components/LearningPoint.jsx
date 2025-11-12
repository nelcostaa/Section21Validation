const LearningPoint = ({ content }) => {
  if (!content) return null

  return (
    <div className="mt-6 border-t border-gray-200 pt-4">
      <div className="text-sm font-semibold text-indigo-600 flex items-center mb-2">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        Learning Point
      </div>
      <div className="mt-1 p-4 bg-blue-50 rounded-lg text-sm text-gray-700">
        <p className="whitespace-pre-line">
          {content.split(/(https?:\/\/[^\s]+)/g).map((part, index) => {
            if (part.match(/^https?:\/\//)) {
              return (
                <a
                  key={index}
                  href={part}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-600 hover:text-indigo-800 underline"
                >
                  {part}
                </a>
              )
            }
            return part
          })}
        </p>
      </div>
    </div>
  )
}

export default LearningPoint

