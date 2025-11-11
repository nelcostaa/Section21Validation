import { useState } from 'react'
import StartPage from './components/StartPage'
import QuestionWizard from './components/QuestionWizard'
import ResultPage from './components/ResultPage'

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
    <div className="min-h-screen bg-gray-50">
      {appState === 'start' && <StartPage onStart={handleStart} />}
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

