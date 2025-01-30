import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Quiz from './pages/quiz';
import MockInterview from './pages/MockInterview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Quiz />} />
        <Route path='/quize' element={<Quiz />} />
        <Route path='/mock' element={<MockInterview />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
