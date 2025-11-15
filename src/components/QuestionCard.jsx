import AnswerButton from './AnswerButton'
import LearningPoint from './LearningPoint'
import { getSectionById } from '../data/questionnaire'

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect, onGoBack, canGoBack }) => {
  const section = getSectionById(question.sectionId)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 relative">
      {canGoBack && (
        <button
          onClick={onGoBack}
          className="absolute top-6 left-6 md:top-8 md:left-8 flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          aria-label="Go back to previous question"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      )}
      <div className={`mb-4 ${canGoBack ? 'ml-12' : ''}`}>
        <span className="inline-block bg-indigo-100 text-indigo-800 text-xs font-semibold px-3 py-1 rounded-full">
          {section.name}
        </span>
        <span className="ml-2 text-sm text-gray-500">Question {question.id}</span>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
        {question.questionText.replace(/\*\*(.*?)\*\*/g, '$1')}
      </h2>

      <div className="space-y-3 mb-6">
        {question.answers.map((answer, index) => (
          <AnswerButton
            key={index}
            text={answer.text}
            value={answer.value}
            onClick={onAnswerSelect}
            isSelected={selectedAnswer === answer.value}
            answerType={answer.action?.type || null}
            questionId={question.id}
          />
        ))}
      </div>

      <LearningPoint content={question.learningPoint} />
    </div>
  )
}

export default QuestionCard

