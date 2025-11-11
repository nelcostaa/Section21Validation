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

          {result.reason && (
            <div className={`p-6 rounded-lg mb-6 ${
              isValid ? 'bg-green-50 border border-green-200' :
              isInvalid ? 'bg-red-50 border border-red-200' :
              'bg-yellow-50 border border-yellow-200'
            }`}>
              <h2 className="font-semibold text-lg mb-2">
                {isInvalid ? 'Reason for Invalidity:' : 'Details:'}
              </h2>
              <p className="text-gray-700">{result.reason}</p>
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
              <button
                onClick={onRestart}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

