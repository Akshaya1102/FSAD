import React, { createContext, useContext, useState } from 'react';

// Create a context for managing the theme
const ThemeContext = createContext();

// Theme provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component that uses the theme context
function ThemeComponent() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <p>Current Theme: {theme}</p>
    </div>
  );
}

// Main App component
function App() {
  return (
    <ThemeProvider>
      <div>
        <h1>Theme App</h1>
        <ThemeComponent />
      </div>
    </ThemeProvider>
  );
}

export default App;
