import React from 'react'

export default function Hero({ onStart }) {
  return (
    <div className="relative min-h-screen flex items-center w-full" style={{ backgroundColor: '#fff8f2' }}>
      {/* Background image */}
      <img
        src="./background.png"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        style={{ zIndex: 0 }}
      />
      
      <div className="container mx-auto px-6 py-24 relative bg-transparent" style={{ zIndex: 1 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* --- Left Column: Graphic --- */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Decorative background circle with orange gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-accent-light/30 to-orange-accent-dark/20 rounded-full blur-2xl transform scale-110"></div>
              <img
                src="./James-Portrait-3-724x1024-3-694x1024.webp"
                alt="James portrait"
                className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-cover rounded-full border-4 border-orange-accent-light/40 shadow-2xl"
              />
            </div>
          </div>

          {/* --- Right Column: Text --- */}
          <div className="flex flex-col gap-6 text-center md:text-left pl-8 md:pl-12">
            <h1
              className="text-5xl md:text-6xl font-extrabold leading-tight bg-gradient-to-r from-orange-accent-dark to-orange-accent-light bg-clip-text text-transparent"
              style={{ textShadow: '0 6px 18px rgba(192,122,82,0.18)' }}
            >
              Section 21
            </h1>
            <h2
              className="mt-2 text-3xl md:text-4xl font-playfair font-medium tracking-tight leading-relaxed bg-gradient-to-r from-orange-accent-dark to-orange-accent-light bg-clip-text text-transparent"
              style={{ textShadow: '0 6px 18px rgba(192,122,82,0.18)' }}
            >
              Notice Validity Checker
            </h2>
            <p className="text-lg text-orange-accent-dark/80">
              Answer a few quick questions to assess whether a Section 21 notice is valid. Get clear guidance and next steps.
            </p>
            {/* Button container with orange gradient accent */}
            <div className="mt-4">
              <button
                onClick={onStart}
                className="bg-gradient-to-r from-orange-accent-dark to-orange-accent-light text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-orange-accent-light hover:to-orange-accent-dark transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Start the assessment
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}


