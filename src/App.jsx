import { useState } from 'react'
import QuestionWizard from './components/QuestionWizard'
import ResultPage from './components/ResultPage'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'

function App() {
  const [appState, setAppState] = useState('start') // 'start', 'questionnaire', 'result'
  const [wizardState, setWizardState] = useState(null)

  const handleStart = () => {
    setAppState('questionnaire')
  }

  const handleComplete = (result) => {
    setWizardState(result)
    setAppState('result')
  }

  const handleRestart = () => {
    setAppState('start')
    setWizardState(null)
  }

  return (
    <div className="min-h-screen bg-noble-dark-green">
      <Navbar />
      {appState === 'start' && <Hero onStart={handleStart} />}
      {appState === 'questionnaire' && (
        <QuestionWizard onComplete={handleComplete} />
      )}
      {appState === 'result' && (
        <ResultPage result={wizardState} onRestart={handleRestart} />
      )}
    </div>
  )
}

export default App

