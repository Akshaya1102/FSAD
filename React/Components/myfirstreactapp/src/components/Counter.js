import React, { useState } from 'react';

/*function Counter() {
  let count=10;
  function handleClick() {
    count = count + 1;
    console.log(count);
  }
  return (
    <div>
      <p>Count: {count}</p>     
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}*/


function Counter() {
  // Define state variable count and a function to update it, setCount
  const [count, setCount] = useState(0);
  const handleClick = () => {
    setCount(count => count + 1);
    setCount(count => count + 1);
  
     } 
 
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleClick}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
