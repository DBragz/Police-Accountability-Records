import React from 'react'

function App() {
  React.useEffect(() => {
    console.log('App component mounted successfully')
  }, [])

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Welcome to My React App!</h1>
      <p>A simple React application built with Vite</p>
    </div>
  )
}

export default App