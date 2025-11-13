import React from 'react'

export default function Navbar() {
  return (
    <>
      <nav style={{ backgroundColor: '#fff8f2' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Use public asset at /site_logo.png — place your @site_logo.png at public/site_logo.png */}
          <div className="flex items-center">
            <a href="/" aria-label="Home">
            <span className="inline-flex items-center justify-center rounded p-1">
                <img src="./site_logo.png" alt="HMO Landlord Safeguarding Service" className="h-8" />
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-orange-accent-dark hover:text-orange-accent-light transition-colors">
              Services
            </a>
            <a
              href="#"
              className="bg-gradient-to-r from-orange-accent-dark to-orange-accent-light text-white px-4 py-2 rounded-full font-semibold hover:from-orange-accent-light hover:to-orange-accent-dark transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book an appointment
            </a>
          </div>
        </div>
      </nav>
      {/* thin separator bar */}
      <div className="h-0.5 bg-orange-accent-light/30" />
    </>
  )
}


