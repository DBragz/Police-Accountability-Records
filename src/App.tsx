import React from 'react'
import { Route, Switch } from 'wouter'

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/" component={() => (
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              Police Accountability Records
            </h1>
            <p className="text-center text-lg">
              A platform for transparent public police accountability data
            </p>
          </div>
        )} />
      </Switch>
    </div>
  )
}

export default App
