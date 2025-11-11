import React from 'react'

export default function Navbar() {
  return (
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-noble-dark-green">Noble Finances</div>
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
    </nav>
  )
}


