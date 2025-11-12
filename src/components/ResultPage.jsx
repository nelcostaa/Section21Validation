import { calculateScore } from '../utils/scoring'
import { getQuestionById } from '../data/questionnaire'
import { processAnswer } from '../utils/questionLogic'

const ResultPage = ({ result, onRestart }) => {
  const isValid = result.result === 'VALID'
  const isInvalid = result.result === 'INVALID'
  const isGreyArea = result.result === 'GREY_AREA'

  const score = calculateScore(result.answers, result.pathHistory, result.result)

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
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
                          <div className="text-sm text-red-700">
                            <span className="font-semibold">Invalid:</span> {r.reason}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(greys.length > 0 || valids.length > 0) && (
                  <div className="p-6 rounded-lg mb-6 bg-white border border-gray-100">
                    <h2 className="font-semibold text-lg mb-4">Passed / Notes</h2>
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

          {/* Collected answers */}
          {result.answers && Object.keys(result.answers).length > 0 && (
            <div className="p-6 rounded-lg mb-6 bg-white border border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Your answers</h2>
              <ul className="space-y-3">
                {(result.pathHistory || Object.keys(result.answers)).filter((id, idx, arr) => arr.indexOf(id) === idx).map((qid) => {
                  const q = getQuestionById(qid)
                  const val = result.answers[qid]
                  const selectedText = q?.answers?.find(a => a.value === val)?.text || String(val)
                  let badge = { color: 'green', text: 'Passed' }
                  try {
                    const action = processAnswer(qid, val)
                    if (action.type === 'result') {
                      if (action.result === 'INVALID') badge = { color: 'red', text: 'Issue' }
                      else if (action.result === 'GREY_AREA') badge = { color: 'yellow', text: 'Grey area' }
                      else badge = { color: 'green', text: 'Passed' }
                    }
                  } catch (e) {
                    // leave badge as default if processing fails
                  }

                  return (
                    <li key={qid} className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="mt-1">
                          {badge.color === 'green' && (
                            <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15.414a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L7 12.586l8.293-8.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                          {badge.color === 'red' && (
                            <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 9.172l.586-.586a1 1 0 111.414 1.414L11.414 10.586l.586.586a1 1 0 11-1.414 1.414L10 12l-.586.586a1 1 0 11-1.414-1.414l.586-.586-.586-.586a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          )}
                          {badge.color === 'yellow' && (
                            <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.454 9.695A1.75 1.75 0 0116.986 15H3.014a1.75 1.75 0 01-1.211-2.206L7.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-9a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0010 4z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{q ? q.questionText.replace(/\*\*(.*?)\*\*/g, '$1') : qid}</div>
                          <div className="text-xs text-gray-500">{selectedText}</div>
                        </div>
                      </div>
                      <div>
                        <span className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${badge.color === 'green' ? 'bg-green-100 text-green-800' : badge.color === 'red' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {badge.text}
                        </span>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

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

