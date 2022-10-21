import React, { useState, useRef } from 'react';
import { useCookies } from 'react-cookie';

import './GeneratePass.scss';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import { generatePassword, shuffle } from '../helpers/helpers';
import AddOns from './AddOns';

const GeneratePass = () => {
  const [cookies, setCookie] = useCookies(['user']);
  const loggedIn = cookies.loggedIn;

  const [length, setLength] = useState(0);
  const [lowercaseIsChecked, setLowercaseIsChecked] = useState(false);
  const [uppercaseIsChecked, setUppercaseIsChecked] = useState(false);
  const [symbolsIsChecked, setSymbolsIsChecked] = useState(false);
  const [numbersIsChecked, setNumbersIsChecked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [copied, setCopied] = useState(false);
  //const [showPass, setShowPass] = useState(false);
  const [showError, setShowError] = useState('');

  //To show and hide password:
  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  //Copy password to clipboard:
  const copy = () => {
    navigator.clipboard.writeText(password);
    setCopied(!copied);
  };


  //To set the password's length:
  const increaseLength = () => {
    setLength(prev => prev + 1);
  };

  const decreaseLength = () => {
    setLength(prev => prev - 1);
  };


  //To know which checkbox was checked:
  const handleOnChange = (condition) => {
    if (condition === 'lowercase') {
      setLowercaseIsChecked(!lowercaseIsChecked);
      console.log('lowercase checked!!');
    }
    if (condition === 'uppercase') {
      setUppercaseIsChecked(!uppercaseIsChecked);
      console.log('uppercase checked!!');
    }
    if (condition === 'symbols') {
      setSymbolsIsChecked(!symbolsIsChecked);
      console.log('symbols checked!!');
    }
    if (condition === 'numbers') {
      setNumbersIsChecked(!numbersIsChecked);
      console.log('numbers checked!!');
    }
  };

  // Handle generating the password:
  const handleSubmit = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '~!@#$%^&*()_-+=[{]}|;:,.<>/?';

    let characters = '';

    if (!length) {
      setShowError('The length needs to be at least 1.');
    }
    if (length) {
      if (lowercaseIsChecked) {
        characters += lowercase;
      }
      if (uppercaseIsChecked) {
        characters += uppercase;
      }
      if (numbersIsChecked) {
        characters += numbers;
      }
      if (symbolsIsChecked) {
        characters += symbols;
      }
      if (!lowercaseIsChecked && !uppercaseIsChecked && !numbersIsChecked && !symbolsIsChecked) { //If nothing is checked, generate a password that has everything.
        characters = lowercase + uppercase + symbols + numbers;
      }
      
      const shuffledChars = shuffle(characters); //So the order of the characters added is not always the same.

      setPassword(generatePassword(shuffledChars, length));
      //setShowPass(!showPass);
      setShowError('');
    }
    

  }
  

  return (
    <div className='generate_form'>
      <div className='title'>
        Generate your password <i className="fa-solid fa-key-skeleton"></i><br />
        Choose your prefered options then click on Generate.
      </div>

      {showError && <Alert key='danger' variant='danger'>
        {showError}
      </Alert>}
      
      <div className='options'>
        <span>Length: <i onClick={decreaseLength} className="fa-solid fa-square-minus"></i> {length} <i onClick={increaseLength} className="fa-solid fa-square-plus"></i></span>
        <span><input 
          type="checkbox"
          id="lowercase"
          name="lowercase" 
          checked={lowercaseIsChecked}
          onChange={() => handleOnChange('lowercase')}
          value="Lowercase" /> Lowercase
        </span>
        <span><input 
          type="checkbox" 
          id="uppercase"
          name="uppercase"
          checked={uppercaseIsChecked}
          onChange={() => handleOnChange("uppercase")}
          value="Uppercase" /> Uppercase
        </span>
        <span><input 
          type="checkbox"
          id="symbol" 
          name="symbol"
          checked={symbolsIsChecked}
          onChange={() => handleOnChange('symbols')}
          value="Symbols" /> Symbols
        </span>
        <span><input 
          type="checkbox" 
          id="numbers" 
          name="numbers"
          checked={numbersIsChecked}
          onChange={() => handleOnChange('numbers')} 
          value="Numbers" /> Numbers
        </span>
      </div>

      <button onClick={handleSubmit} className='generate_btn'>Generate</button>
      
      <div className='generated_pass'>
        <input 
          defaultValue={password}
          type={!passwordShown ? 'text' : 'password'}
          disabled
        />
        {!passwordShown ? <i onClick={togglePassword} className="fa-solid fa-eye-slash"></i> : <i onClick={togglePassword} className="fa-solid fa-eye"></i>}

        &nbsp;
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id={`tooltip-right`}>
              {copied ? 'Copied!' : 'Copy to clipboard.'}
            </Tooltip>
          }
        >
          <i onClick={copy} className="fa-solid fa-copy"></i>
        </OverlayTrigger>
      </div>

      {loggedIn && <AddOns password={password} />}

    </div>
  );
}
 
export default GeneratePass;