import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import './assets/css/optionCon.css';
import Quiz from './pages/quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/quize' element={<Quiz />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App
