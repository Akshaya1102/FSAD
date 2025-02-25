import React from 'react';
import './App.css';
import ToggleButton from './components/Toggle';
import Welcome from './components/Welcome';
import Counter from './components/Counter';
import FindUser from './components/FindUser';
function App() {
    let isLogged=true;
    return (
      <div className="App">
      {isLogged && <ToggleButton />}
      <Welcome age='34'/>
      <Welcome name="joe" age='35'/>
      <Counter />      
      <FindUser />
  
    </div>
        
    
  );
}

export default App;
