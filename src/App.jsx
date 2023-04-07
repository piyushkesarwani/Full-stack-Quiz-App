import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Quiz } from './Components/Quiz/Quiz'
import { Homepage } from './Components/Homepage/Homepage'
import { EditQuiz } from './Components/EditQuiz/EditQuiz'
import { StartQuiz } from './Components/StartQuiz/StartQuiz'
import { User } from './Components/User/User'

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path="/quiz" element={<Quiz />} />
          <Route exact path="/quiz/user" element={<User />} />
          <Route exact path="/quiz/edit" element={<EditQuiz />} />
          <Route exact path="/quiz/start" element={<StartQuiz />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
