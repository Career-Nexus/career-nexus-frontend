import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import MentorProfile from './components/MentorProfile';
import JobSearch from './components/JobSearch';

function App() {
  return (
    <Router>
    <div className="App">
       <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add other routes like Register if needed */}
        </Routes>
      <header className="App-header">
      <h1>Welcome to CareerNexus</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <Login />
      <Register />
      <Dashboard />
      <MentorProfile />
      <JobSearch />
      </header>
    </div>
    </Router>
  );
}

export default App;
