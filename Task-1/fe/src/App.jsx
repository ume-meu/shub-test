import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './page/Home';
import Example from './page/Example';

const routes = (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/test" element={<Example />} />
      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
);

const App = () => {
  return (
    <div>{routes}</div>
  );
};

export default App;
