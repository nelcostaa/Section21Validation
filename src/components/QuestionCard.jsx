import AnswerButton from './AnswerButton'
import LearningPoint from './LearningPoint'
import { getSectionById } from '../data/questionnaire'

const QuestionCard = ({ question, selectedAnswer, onAnswerSelect }) => {
  const section = getSectionById(question.sectionId)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
      <div className="mb-4">
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
          />
        ))}
      </div>

      <LearningPoint content={question.learningPoint} />
    </div>
  )
}

export default QuestionCard

