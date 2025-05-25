import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/main/Index';
import Quizes from './pages/main/Quizes';
import Quiz from './pages/main/Quiz';
import Register from './pages/main/Register';
import Login from './pages/main/Login';
import Statistics from './pages/main/Statistics';
import QuizEdit from './pages/admin/QuizEdit';
import EditQuizQuestion from './pages/admin/EditQuizQuestion';
import NotFound from './pages/components/NotFound';

import './App.css';
import ProtectedRoute from './hooks/ProtectedRoute';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Index />} />
          <Route path="/quizes" element={<Quizes />} />
          <Route path="/quiz/:id" element={<Quiz />} />

          <Route path="/quiz-edit/:id" element={<ProtectedRoute adminOnly> {<QuizEdit />} </ProtectedRoute>} />
          <Route path="/quiz-edit/question/:id" element={<ProtectedRoute adminOnly> {<EditQuizQuestion />} </ProtectedRoute>} />

          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/statistics" element={<Statistics />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
