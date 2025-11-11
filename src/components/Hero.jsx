import React from 'react'

// Temporary inline SVG placeholder for the globe graphic.
// Replace with an asset import (e.g. ../assets/globe.png) when you add the real image.
export default function Hero({ onStart }) {
  return (
    <div className="container mx-auto px-6 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-5xl md:text-6xl font-bold text-noble-dark-green leading-tight">
            Financial Clarity You Can Trust
          </h1>
          <p className="text-lg text-noble-dark-green">
            Trusted financial guidance for every stage of life and business since 1987
          </p>
          <div className="mt-4">
            <button
              onClick={onStart}
              className="bg-noble-dark-green text-white px-6 py-3 rounded-full font-semibold hover:bg-opacity-90 transition-colors"
            >
              Connect with our experts
            </button>
          </div>
        </div>
        <div className="flex justify-center md:justify-end">
          {/* Simple globe-like SVG placeholder — replace when you add the asset */}
          <svg
            viewBox="0 0 200 200"
            className="w-full max-w-lg"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-label="Globe placeholder"
          >
            <circle cx="100" cy="100" r="90" fill="#6fc3a6" />
            <path d="M10 100h180" stroke="#2f5a46" strokeWidth="3" />
            <path d="M100 10v180" stroke="#2f5a46" strokeWidth="3" />
            <circle cx="140" cy="60" r="9" fill="#f7d6b0" />
            <circle cx="70" cy="140" r="9" fill="#f7d6b0" />
          </svg>
        </div>
      </div>
    </div>
  )
}


