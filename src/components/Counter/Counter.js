import React, { useState } from 'react';

const Counter = () => {
  const [counterValue, setCounterValue] = useState(0)
  const [inputValue, setInputValue] = useState(1)


  return (
    <div className="wrap">
      <h1 data-testid="header">My Counter</h1>
      <h2 data-testid="counter">{counterValue}</h2>
      <button 
      data-testid="subtract-btn"
      onClick={() => { setCounterValue(counterValue - parseInt(inputValue))}}
      >-</button>
      <input 
      type="number" 
      data-testid="input" 
      value={inputValue} 
      onChange={(e) => { setInputValue(e.target.value)}}
      />
      <button 
      data-testid="add-btn"
      onClick={() => { setCounterValue(prev => prev + parseInt(inputValue))}}
      >+</button>
    </div>
  );
};

export default Counter;