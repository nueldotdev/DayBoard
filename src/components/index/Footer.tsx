import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="grid grid-cols-1 bg-black text-gray-600 p-10">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} DayBoard. All rights reserved.</p>
        <nav className='mt-2 text-center w-full'>
          <ul className="flex items-center justify-center gap-4">
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}