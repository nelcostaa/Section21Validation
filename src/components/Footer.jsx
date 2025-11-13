import React from 'react'

export default function Footer() {
  return (
    <footer className="text-simple-dark border-t border-gray-300" style={{ backgroundColor: '#efe6df' }}>
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>
            <p className="text-sm">Email: <a href="mailto:info@example.com" className="text-noble-dark-green hover:underline">info@example.com</a></p>
            <p className="text-sm">Phone: <a href="tel:+441234567890" className="text-noble-dark-green hover:underline">+44 1234 567890</a></p>
            <p className="text-sm mt-2">Address: 123 Example St, London</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">About</h3>
            <p className="text-sm text-simple-dark">Placeholder text about the HMO Landlord Safeguarding Service. Replace with real copy.</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Follow us</h3>
            <div className="flex items-center gap-4 mt-2">
              {/* Social icon placeholders - replace hrefs with real profiles */}
              <a href="#" aria-label="Twitter" className="text-simple-dark hover:text-noble-dark-green" title="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724 9.86 9.86 0 0 1-3.127 1.195 4.917 4.917 0 0 0-8.38 4.482A13.94 13.94 0 0 1 1.671 3.149a4.917 4.917 0 0 0 1.523 6.562 4.897 4.897 0 0 1-2.228-.616c-.054 2.281 1.581 4.415 3.95 4.89A4.935 4.935 0 0 1 .96 14.1v.062a4.918 4.918 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.085 4.923 4.923 0 0 0 4.596 3.417A9.868 9.868 0 0 1 0 21.543a13.94 13.94 0 0 0 7.548 2.212c9.057 0 14.009-7.506 14.009-14.009 0-.213-.005-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/>
                </svg>
              </a>
              <a href="#" aria-label="Facebook" className="text-simple-dark hover:text-noble-dark-green" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692V11.01h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.31h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn" className="text-simple-dark hover:text-noble-dark-green" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.023-3.039-1.852-3.039-1.854 0-2.137 1.447-2.137 2.942v5.666H9.35V9h3.414v1.561h.049c.476-.9 1.637-1.852 3.369-1.852 3.602 0 4.268 2.371 4.268 5.455v6.288zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.225.792 24 1.771 24h20.451C23.2 24 24 23.225 24 22.271V1.729C24 .774 23.2 0 22.225 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-simple-dark mt-8">
          © {new Date().getFullYear()} HMO Landlord Safeguarding Service. All rights reserved.
        </div>
      </div>
    </footer>
  )
}


