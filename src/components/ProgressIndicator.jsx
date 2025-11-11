import { questionnaire } from '../data/questionnaire'

const ProgressIndicator = ({ currentQuestionId }) => {
  const currentQuestion = questionnaire.questions.find(q => q.id === currentQuestionId)
  const currentSectionId = currentQuestion?.sectionId || 1
  
  const totalSections = questionnaire.sections.length
  const completedSections = currentSectionId - 1
  const progressPercentage = (completedSections / totalSections) * 100

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700">
          Section {currentSectionId} of {totalSections}
        </span>
        <span className="text-sm text-gray-500">
          {Math.round(progressPercentage)}% Complete
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div
          className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
          role="progressbar"
          aria-valuenow={progressPercentage}
          aria-valuemin="0"
          aria-valuemax="100"
        />
      </div>
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        {questionnaire.sections.map((section) => (
          <span
            key={section.id}
            className={`${
              section.id < currentSectionId
                ? 'text-indigo-600 font-medium'
                : section.id === currentSectionId
                ? 'text-indigo-600 font-semibold'
                : 'text-gray-400'
            }`}
          >
            {section.id}
          </span>
        ))}
      </div>
    </div>
  )
}

export default ProgressIndicator

