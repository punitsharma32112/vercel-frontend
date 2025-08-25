import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Patient from './components/Patient';
import Doctor from './components/Doctors';
import Admin from './components/Admins';

// Theme Context for global theme switching
export const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  // Set font globally
  useEffect(() => {
    document.body.style.fontFamily = "'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif";
  }, []);

  // Dynamically load theme CSS
  useEffect(() => {
    let themeLink = document.getElementById('theme-style');
    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.rel = 'stylesheet';
      themeLink.id = 'theme-style';
      document.head.appendChild(themeLink);
    }
    themeLink.href = theme === 'dark' ? '/src/theme-dark.css' : '/src/theme-light.css';
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
      {/* Floating theme toggle button */}
      <button
        onClick={toggleTheme}
        style={{
          position: 'fixed',
          left: 16,
          bottom: 16,
          zIndex: 2000,
          width: 48,
          height: 48,
          borderRadius: 24,
          fontSize: 24,
          fontWeight: 700,
          background: theme === 'dark' ? '#18181b' : '#fff',
          color: theme === 'dark' ? '#f3f4f6' : '#1e293b',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          border: '1px solid #cbd5e1',
          cursor: 'pointer',
        }}
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? '🌞' : '🌙'}
      </button>
    </ThemeContext.Provider>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/patient" element={<Patient />} />
            <Route path="/doctor" element={<Doctor />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;