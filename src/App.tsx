import React from 'react'

function App() {
  console.log('App component mounted - Police Accountability Records')

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Police Accountability Records
          </h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          Welcome to Police Accountability Records
        </div>
      </main>
    </div>
  )
}

export default App