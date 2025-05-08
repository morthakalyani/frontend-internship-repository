import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">
      <div className="text-center bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Tailwind CSS!
        </h1>
        <p className="text-gray-700 mb-6">
          This is a simple layout styled using Tailwind CSS. You can modify the
          design and explore more utilities to style your app.
        </p>
        <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none transition duration-300">
          Click Me
        </button>
      </div>
    </div>
  );
}

export default App;