import { calculateScore } from '../utils/scoring'
import { getQuestionById } from '../data/questionnaire'
import { processAnswer } from '../utils/questionLogic'

const ResultPage = ({ result, onRestart }) => {
  const isValid = result.result === 'VALID'
  const isInvalid = result.result === 'INVALID'
  const isGreyArea = result.result === 'GREY_AREA'

  const score = calculateScore(result.answers, result.pathHistory, result.result)

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#fff8f2' }}>
      <div className="max-w-3xl mx-auto">
        <div className={`bg-white rounded-lg shadow-lg p-8 md:p-12 ${
          isValid ? 'border-l-4 border-green-500' : 
          isInvalid ? 'border-l-4 border-red-500' : 
          'border-l-4 border-yellow-500'
        }`}>
          <div className="text-center mb-8">
            {isValid && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-green-600 mb-2">VALID</h1>
                <p className="text-xl text-gray-700">
                  Your Section 21 notice appears to meet the statutory requirements.
                </p>
              </>
            )}
            
            {isInvalid && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-4">
                  <svg
                    className="h-8 w-8 text-red-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-red-600 mb-2">INVALID</h1>
                <p className="text-xl text-gray-700">
                  Your Section 21 notice is not valid.
                </p>
              </>
            )}

            {isGreyArea && (
              <>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-4">
                  <svg
                    className="h-8 w-8 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <h1 className="text-4xl font-bold text-yellow-600 mb-2">GREY AREA</h1>
                <p className="text-xl text-gray-700">
                  The law is not fully settled on this point.
                </p>
              </>
            )}
          </div>

          {result.reasons && result.reasons.length > 0 && (() => {
            const invalids = result.reasons.filter(r => r.type === 'INVALID')
            const greys = result.reasons.filter(r => r.type === 'GREY_AREA')
            const valids = result.reasons.filter(r => r.type === 'VALID')
            return (
              <div className="space-y-6">
                {invalids.length > 0 && (
                  <div className="p-6 rounded-lg mb-6 bg-white border border-red-100">
                    <h2 className="font-semibold text-lg mb-4 text-red-700">Invalid Questions</h2>
                    <div className="space-y-4">
                      {invalids.map((r, i) => (
                        <div key={`invalid-${i}`} className="bg-gray-50 p-4 rounded">
                          <div className="text-sm text-gray-600 mb-1">
                            <strong>Section {r.sectionId}.</strong> Question {r.questionId}.
                          </div>
                          <div className="font-medium text-gray-900 mb-1">{r.questionText}</div>
                          <div className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">You answered:</span> {r.answer}
                          </div>
                          <div className="text-sm text-red-700 mb-2">
                            <span className="font-semibold">Invalid:</span> {r.reason}
                          </div>
                          {r.actionToTake && (
                            <div className="text-sm text-blue-700 bg-blue-50 p-3 rounded border-l-2 border-blue-400">
                              <span className="font-semibold">Action to take:</span> {r.actionToTake}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(greys.length > 0 || valids.length > 0) && (
                  <div className="p-6 rounded-lg mb-6 bg-white border border-green-100">
                    <h2 className="font-semibold text-lg mb-4 text-green-700">Passed / Notes</h2>
                    <div className="space-y-4">
                      {greys.map((r, i) => (
                        <div key={`grey-${i}`} className="bg-gray-50 p-4 rounded">
                          <div className="text-sm text-gray-600 mb-1">
                            <strong>Section {r.sectionId}.</strong> Question {r.questionId}.
                          </div>
                          <div className="font-medium text-gray-900 mb-1">{r.questionText}</div>
                          <div className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">You answered:</span> {r.answer}
                          </div>
                          <div className="text-sm text-yellow-700">
                            <span className="font-semibold">Note:</span> {r.reason}
                          </div>
                        </div>
                      ))}

                      {valids.map((r, i) => (
                        <div key={`valid-${i}`} className="bg-gray-50 p-4 rounded">
                          <div className="text-sm text-gray-600 mb-1">
                            <strong>Section {r.sectionId}.</strong> Question {r.questionId}.
                          </div>
                          <div className="font-medium text-gray-900 mb-1">{r.questionText}</div>
                          <div className="text-sm text-gray-700 mb-2">
                            <span className="font-semibold">You answered:</span> {r.answer}
                          </div>
                          {r.reason && (
                            <div className="text-sm text-green-700">
                              <span className="font-semibold">Passed:</span> {r.reason}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )
          })()}

          

          {isInvalid && (
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong className="font-semibold">Next Steps:</strong> You must rectify the issue and serve a new, compliant notice before proceeding with a possession claim.
              </p>
            </div>
          )}

          {isGreyArea && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong className="font-semibold">Recommendation:</strong> While your notice may be valid, it could be challenged in court. We recommend seeking professional legal advice.
              </p>
            </div>
          )}

          {isValid && (
            <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
              <p className="text-sm text-gray-700">
                <strong className="font-semibold">Next Steps:</strong> You may proceed with a possession claim if the tenant does not leave by the expiry date.
              </p>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Download Compliance Checklist
              </a>
              <a
                href="#"
                className="bg-gray-800 hover:bg-gray-900 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Book a Consultation
              </a>
              <button
                onClick={onRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-md transition-colors"
              >
                Start New Assessment
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-xs text-gray-500 text-center">
              This assessment is for informational purposes only and is not a substitute for professional legal advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPage

