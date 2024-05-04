import React, { useState } from 'react';

function ToggleButton() {
  // Define state variable isToggled and a function to toggle it, setIsToggled
  const [isToggled, setIsToggled] = useState(false);

  return (
    <div>
      <button onClick={() => setIsToggled(!isToggled)}>
        {isToggled ? 'ON' : 'OFF'}
      </button>
      <p>{isToggled ? 'The button is ON' : 'The button is OFF'}</p>
    </div>
  );
}

export default ToggleButton;
