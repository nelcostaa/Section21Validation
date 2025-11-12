import React from 'react'

export default function Hero({ onStart }) {
  return (
    <div className="container mx-auto px-6 py-24 min-h-screen flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* --- Left Column: Text --- */}
        <div className="flex flex-col gap-6 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-simple-dark leading-tight">
            Section 21 Notice Validity Checker
          </h1>
          <p className="text-lg text-simple-dark opacity-80">
            Answer a few quick questions to assess whether a Section 21 notice is valid. Get clear guidance and next steps.
          </p>
          {/* Button container */}
          <div className="mt-4">
            <button
              onClick={onStart}
              className="bg-simple-dark text-simple-beige px-8 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              Start the assessment
            </button>
          </div>
        </div>

        {/* --- Right Column: Graphic --- */}
        <div className="flex justify-center items-center">
          <div className="relative w-72 h-72 bg-simple-dark rounded-full flex justify-center items-center">
            {/* Horizontal Line */}
            <div className="absolute w-full h-px bg-simple-beige"></div>
            {/* Vertical Line */}
            <div className="absolute h-full w-px bg-simple-beige"></div>
            {/* The dots */}
            <div className="absolute w-6 h-6 bg-simple-beige rounded-full top-[20%] right-[20%]"></div>
            <div className="absolute w-6 h-6 bg-simple-beige rounded-full bottom-[20%] left-[20%]"></div>
          </div>
        </div>

      </div>
    </div>
  )
}


