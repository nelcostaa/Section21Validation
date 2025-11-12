import React from 'react'

export default function Navbar() {
  return (
    <>
      <nav className="bg-simple-beige">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Use public asset at /site_logo.png — place your @site_logo.png at public/site_logo.png */}
          <div className="flex items-center">
            <a href="/" aria-label="Home">
            <span className="inline-flex items-center justify-center bg-noble-dark-green rounded p-1">
                <img src="./site_logo.png" alt="HMO Landlord Safeguarding Service" className="h-8" />
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-noble-dark-green hover:underline">
              Services
            </a>
            <a
              href="#"
              className="bg-noble-dark-green text-white px-4 py-2 rounded-full font-semibold hover:opacity-90 transition"
            >
              Book an appointment
            </a>
          </div>
        </div>
      </nav>
      {/* thin separator bar */}
      <div className="h-0.5 bg-gray-300" />
    </>
  )
}


