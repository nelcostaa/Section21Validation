import { calculateScore } from '../utils/scoring'

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

          {result.reasons && result.reasons.length > 0 && (
            <div className="p-6 rounded-lg mb-6 bg-white border border-gray-100">
              <h2 className="font-semibold text-lg mb-4">Checklist</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-semibold text-green-700 mb-2">Passed</h3>
                  <ul className="space-y-2">
                    {result.reasons.filter(r => r.type === 'VALID').map((r, i) => (
                      <li key={`valid-${i}`} className="flex items-start gap-3">
                        <div className="mt-1">
                          <svg className="h-5 w-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414L8.414 15.414a1 1 0 01-1.414 0L3.293 11.707a1 1 0 011.414-1.414L7 12.586l8.293-8.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-700">{r.reason}</div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-red-700 mb-2">Issues</h3>
                  <ul className="space-y-2">
                    {result.reasons.filter(r => r.type === 'INVALID').map((r, i) => (
                      <li key={`invalid-${i}`} className="flex items-start gap-3">
                        <div className="mt-1">
                          <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1.414-9.414a1 1 0 011.414 0L10 9.172l.586-.586a1 1 0 111.414 1.414L11.414 10.586l.586.586a1 1 0 11-1.414 1.414L10 12l-.586.586a1 1 0 11-1.414-1.414l.586-.586-.586-.586a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-700">{r.reason}</div>
                      </li>
                    ))}
                    {result.reasons.filter(r => r.type === 'GREY_AREA').map((r, i) => (
                      <li key={`grey-${i}`} className="flex items-start gap-3">
                        <div className="mt-1">
                          <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.454 9.695A1.75 1.75 0 0116.986 15H3.014a1.75 1.75 0 01-1.211-2.206L7.257 3.1zM11 13a1 1 0 10-2 0 1 1 0 002 0zm-1-9a.75.75 0 00-.75.75v4.5a.75.75 0 001.5 0v-4.5A.75.75 0 0010 4z" />
                          </svg>
                        </div>
                        <div className="text-sm text-gray-700">{r.reason}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
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

