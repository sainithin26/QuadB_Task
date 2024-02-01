import React from 'react';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import './App.css';
import ShowList from './ShowList';
import ShowDetails from './ShowDetails';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<ShowList />} />
            <Route path="/show/:id" element={<ShowDetails />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
