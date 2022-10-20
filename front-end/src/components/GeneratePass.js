import React, { useState } from 'react';


import './GeneratePass.scss';

const GeneratePass = () => {
  const [length, setLength] = useState(0);
  const [lowercaseIsChecked, setLowercaseIsChecked] = useState(false);
  const [uppercaseIsChecked, setUppercaseIsChecked] = useState(false);
  const [symbolsIsChecked, setSymbolsIsChecked] = useState(false);
  const [numbersIsChecked, setNumbersIsChecked] = useState(false);

  const handleOnChange = (condition) => {
    if (condition === 'lowercase') {
      setLowercaseIsChecked(!lowercaseIsChecked);
    }
    if (condition === 'uppercase') {
      setUppercaseIsChecked(!uppercaseIsChecked);
    }
    if (condition === 'symbols') {
      setSymbolsIsChecked(!symbolsIsChecked);
    }
    if (condition === 'numbers') {
      setNumbersIsChecked(!numbersIsChecked);
    }
  };

  const increaseLength = () => {
    setLength(prev => prev + 1);
  };

  const decreaseLength = () => {
    setLength(prev => prev - 1);
  };

  

  return (
    <div className='generate_form'>
      <div className='title'>
        Generate your password <i class="fa-solid fa-key-skeleton"></i><br />
        Choose your prefered options then click on Generate.
      </div>
      
      <div className='options'>
        <span>Length: <i onClick={decreaseLength} className="fa-solid fa-square-minus"></i> {length} <i onClick={increaseLength} className="fa-solid fa-square-plus"></i></span>
        <span><input 
          type="checkbox"
          id="lowercase"
          name="lowercase" 
          checked={lowercaseIsChecked}
          onChange={handleOnChange(lowercase)}
          value="Lowercase" /> Lowercase
        </span>
        <span><input 
          type="checkbox" 
          id="uppercase"
          name="uppercase"
          checked={uppercaseIsChecked}
          onChange={handleOnChange(uppercase)}
          value="Uppercase" /> Uppercase
        </span>
        <span><input 
          type="checkbox"
          id="symbol" 
          name="symbol"
          checked={symbolsIsChecked}
          onChange={handleOnChange(symbols)}
          value="Symbols" /> Symbols
        </span>
        <span><input 
          type="checkbox" 
          id="numbers" 
          name="numbers"
          checked={numbersIsChecked}
          onChange={handleOnChange(numbers)} 
          value="Numbers" /> Numbers
        </span>
      </div>

      <button className='generate_btn'>Generate</button>
      <div className='generated_pass'>
        password <i class="fa-solid fa-eye-slash"></i> <i class="fa-solid fa-eye"></i>
      </div>
    </div>
  );
}
 
export default GeneratePass;