const StartPage = ({ onStart }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4">
      <div className="max-w-2xl w-full bg-white rounded-lg shadow-xl p-8 md:p-12">
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Section 21 Notice Validity Checker
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Assess whether your Section 21 notice meets all statutory requirements
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 text-left">
            <p className="text-sm text-gray-700">
              <strong className="font-semibold">Important:</strong> This tool is for informational purposes only and is not a substitute for professional legal advice.
            </p>
          </div>
          <button
            onClick={onStart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition-colors duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Start Assessment
          </button>
          <p className="text-sm text-gray-500 mt-6">
            The assessment will take approximately 5-10 minutes
          </p>
        </div>
      </div>
    </div>
  )
}

export default StartPage

