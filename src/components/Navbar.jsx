import React from 'react'

export default function Navbar() {
  return (
    <>
      <nav className="text-simple-dark" style={{ backgroundColor: '#fff8f2' }}>
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          {/* Use public asset at /site_logo.png — place your @site_logo.png at public/site_logo.png */}
          <div className="flex items-center">
            <a href="/" aria-label="Home" className="group">
            <span className="inline-flex items-center justify-center rounded-lg p-2 bg-gradient-to-br from-orange-accent-dark to-orange-accent-light animate-pulse-glow hover:animate-gentle-bounce transition-all duration-300 hover:scale-110 hover:rotate-2 shadow-lg hover:shadow-xl">
                <img 
                  src="./site_logo.png" 
                  alt="HMO Landlord Safeguarding Service" 
                  className="h-8 transition-transform duration-300 group-hover:scale-105" 
                />
              </span>
            </a>
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm font-medium text-simple-dark hover:text-orange-accent-dark transition-colors">
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


