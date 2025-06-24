import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InputForm from './components/InputForm';
import AnimationView from './components/AnimationView';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<InputForm />} />
          <Route path="/animation" element={<AnimationView />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;