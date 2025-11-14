import { useState } from 'react'
import { calculateScore } from '../utils/scoring'
import { getQuestionById } from '../data/questionnaire'
import { processAnswer } from '../utils/questionLogic'

const ResultPage = ({ result, onRestart }) => {
  const isValid = result.result === 'VALID'
  const isInvalid = result.result === 'INVALID'
  const isGreyArea = result.result === 'GREY_AREA'
  const [isInvalidExpanded, setIsInvalidExpanded] = useState(false)
  const [isPassedNotesExpanded, setIsPassedNotesExpanded] = useState(false)

  const score = calculateScore(result.answers, result.pathHistory, result.result)

  // Calculate counts early for use in header
  const invalids = result.reasons ? result.reasons.filter(r => r.type === 'INVALID') : []
  const greys = result.reasons ? result.reasons.filter(r => r.type === 'GREY_AREA') : []
  const valids = result.reasons ? result.reasons.filter(r => r.type === 'VALID') : []

  return (
    <div className="min-h-screen py-8 px-4" style={{ backgroundColor: '#fff8f2' }}>
      <div className="max-w-3xl mx-auto">
        <div className={`bg-white rounded-lg shadow-lg p-8 md:p-12 ${
          isValid ? 'border-l-4 border-green-500' : 
          isInvalid ? 'border-l-4 border-red-500' : 
          'border-l-4 border-yellow-500'
        }`}>
          {/* Header with two-column grid: left (text) + right (stat cards) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Left Column: Heading + Text */}
            <div className="flex flex-col">
              {isValid && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-green-100 flex-shrink-0">
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
                    <h1 className="text-4xl font-bold text-green-600">VALID</h1>
                  </div>
                  <p className="text-left text-xl text-gray-700 leading-relaxed">
                    Your Section 21 notice appears to meet the statutory requirements.
                  </p>
                </>
              )}
              
              {isInvalid && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-red-100 flex-shrink-0">
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
                    <h1 className="text-4xl font-bold text-red-600">INVALID</h1>
                  </div>
                  <p className="text-left text-xl text-gray-700 leading-relaxed">
                    Your Section 21 notice is not valid.
                  </p>
                </>
              )}

              {isGreyArea && (
                <>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 flex-shrink-0">
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
                    <h1 className="text-4xl font-bold text-yellow-600">GREY AREA</h1>
                  </div>
                  <p className="text-left text-xl text-gray-700 leading-relaxed">
                    The law is not fully settled on this point.
                  </p>
                </>
              )}
            </div>

            {/* Right Column: Stat Cards */}
            <div className="flex flex-col gap-3 justify-start">
              {valids.length > 0 && (
                <div className="bg-green-600 text-white p-5 rounded-lg">
                  <div className="text-2xl font-bold mb-1">{valids.length}</div>
                  <div className="text-sm font-semibold">items Compliant</div>
                </div>
              )}
              {invalids.length > 0 && (
                <div className="bg-red-600 text-white p-5 rounded-lg">
                  <div className="text-2xl font-bold mb-1">{invalids.length}</div>
                  <div className="text-sm font-semibold">items Invalid</div>
                </div>
              )}
              {greys.length > 0 && (
                <div className="bg-gray-600 text-white p-5 rounded-lg">
                  <div className="text-2xl font-bold mb-1">{greys.length}</div>
                  <div className="text-sm font-semibold">items Uncertain</div>
                </div>
              )}
            </div>
          </div>

          {result.reasons && result.reasons.length > 0 && (
              <div className="space-y-6">
                {invalids.length > 0 && (
                  <div className="p-6 rounded-lg mb-6 bg-white border border-red-100">
                    <button
                      onClick={() => setIsInvalidExpanded(!isInvalidExpanded)}
                      className="w-full flex items-center justify-between font-semibold text-lg mb-4 text-red-700 hover:text-red-800 transition-colors"
                      aria-expanded={isInvalidExpanded}
                      aria-controls="invalid-questions-content"
                    >
                      <span>Invalid Questions</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 ${isInvalidExpanded ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isInvalidExpanded && (
                      <div id="invalid-questions-content" className="space-y-4 transition-opacity duration-200">
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
                    )}
                  </div>
                )}

                {(greys.length > 0 || valids.length > 0) && (
                  <div className="p-6 rounded-lg mb-6 bg-white border border-green-100">
                    <button
                      onClick={() => setIsPassedNotesExpanded(!isPassedNotesExpanded)}
                      className="w-full flex items-center justify-between font-semibold text-lg mb-4 text-green-700 hover:text-green-800 transition-colors"
                      aria-expanded={isPassedNotesExpanded}
                      aria-controls="passed-notes-content"
                    >
                      <span>Passed / Notes</span>
                      <svg
                        className={`h-5 w-5 transition-transform duration-200 ${isPassedNotesExpanded ? 'transform rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {isPassedNotesExpanded && (
                      <div id="passed-notes-content" className="space-y-4 transition-opacity duration-200">
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
                    )}
                  </div>
                )}
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

          {/* Start New Assessment button inside card */}
          <div className="mt-6 mb-6 flex justify-center">
            <button
              onClick={onRestart}
              className="bg-gradient-to-r from-orange-accent-dark to-orange-accent-light text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:from-orange-accent-light hover:to-orange-accent-dark transition-all duration-300 shadow-md hover:shadow-lg border-2 border-orange-accent-light/50"
            >
              Start New Assessment
            </button>
          </div>

          <div className="mt-8 pt-6 border-t border-orange-accent-light/30">
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="#"
                className="bg-gradient-to-r from-orange-accent-dark to-orange-accent-light text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-orange-accent-light hover:to-orange-accent-dark transition-all duration-300 shadow-md hover:shadow-lg border-2 border-orange-accent-light/50 text-center"
              >
                Download Compliance Checklist
              </a>
              <a
                href="#"
                className="bg-gradient-to-r from-orange-accent-dark to-orange-accent-light text-white px-5 py-2 rounded-full text-sm font-semibold hover:from-orange-accent-light hover:to-orange-accent-dark transition-all duration-300 shadow-md hover:shadow-lg border-2 border-orange-accent-light/50 text-center"
              >
                Book a Consultation
              </a>
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

