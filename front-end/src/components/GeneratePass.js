import React, { useState } from 'react';
import { useCookies } from 'react-cookie';

import './GeneratePass.scss';

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Alert from 'react-bootstrap/Alert';

import { generatePassword, shuffle } from '../helpers/helpers';
import AddOns from './AddOns';

const GeneratePass = (props) => {
  const [cookies, setCookie] = useCookies(['user']);
  const loggedIn = cookies.loggedIn;

  const [password, setPassword] = useState('');

  const [options, setOptions] = useState({
    length: 0,
    lowercase: false,
    uppercase: false,
    symbols: false,
    numbers: false
  });

  const [passwordShown, setPasswordShown] = useState(false);
  const [copied, setCopied] = useState(false);
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
    setOptions(prev => ({
      ...prev,
      length: prev.length + 1
    }));
  };

  const decreaseLength = () => {
    setOptions(prev => ({
      ...prev,
      length: prev.length - 1
    }));
  };


  //To know which checkbox was checked:
  const handleOnChange = (condition) => {
    if (condition === 'lowercase') {
      setOptions(prev => ({
        ...prev,
        lowercase: !options.lowercase
      }));
    }

    if (condition === 'uppercase') {
      setOptions(prev => ({
        ...prev,
        uppercase: !options.uppercase
      }));
    }

    if (condition === 'symbols') {
      setOptions(prev => ({
        ...prev,
        symbols: !options.symbols
      }));
    }
    
    if (condition === 'numbers') {
      setOptions(prev => ({
        ...prev,
        numbers: !options.numbers
      }));
    }
  };

  // Handle generating the password:
  const handleSubmit = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '~!@#$%^&*()_-+=[{]}|;:,.<>/?';

    let characters = '';

    if (!options.length) {
      setShowError('The length needs to be at least 1.');
    }
    if (options.length) {
      if (options.lowercase) {
        characters += lowercase;
      }
      if (options.uppercase) {
        characters += uppercase;
      }
      if (options.numbers) {
        characters += numbers;
      }
      if (options.symbols) {
        characters += symbols;
      }
      if (!options.lowercase && !options.uppercase && !options.numbers && !options.symbols) { //If nothing is checked, generate a password that has everything.
        characters = lowercase + uppercase + symbols + numbers;
      }
      

      const shuffledChars = shuffle(characters); //So the order of the characters added is not always the same.

      setPassword(generatePassword(shuffledChars, options.length));
      setShowError('');
      setOptions(prev => ({
        ...prev,
        length: 0,
        lowercase: false,
        uppercase: false,
        numbers: false,
        symbols: false
      }));
    }
  };
  

  return (
    <div className='generate_form'>
      <div className='title'>
        {!loggedIn && <span className='logo'>OnePass<br /></span>}
        <span className='phrase'>Choose your prefered options then generate your password.</span>
      </div>

      {showError && <Alert key='danger' variant='danger'>
        {showError}
      </Alert>}
      
      <div className='options'>
        <span>Length: <i onClick={decreaseLength} className="fa-solid fa-square-minus"></i> {options.length} <i onClick={increaseLength} className="fa-solid fa-square-plus"></i></span>
        <span><input 
          type="checkbox"
          id="lowercase"
          name="lowercase" 
          checked={options.lowercase}
          onChange={() => handleOnChange('lowercase')}
          value="Lowercase" /> Lowercase
        </span>
        <span><input 
          type="checkbox" 
          id="uppercase"
          name="uppercase"
          checked={options.uppercase}
          onChange={() => handleOnChange("uppercase")}
          value="Uppercase" /> Uppercase
        </span>
        <span><input 
          type="checkbox"
          id="symbol" 
          name="symbol"
          checked={options.symbols}
          onChange={() => handleOnChange('symbols')}
          value="Symbols" /> Symbols
        </span>
        <span><input 
          type="checkbox" 
          id="numbers" 
          name="numbers"
          checked={options.numbers}
          onChange={() => handleOnChange('numbers')} 
          value="Numbers" /> Numbers
        </span>
      </div>

      <button onClick={handleSubmit} className='generate_btn'>Generate </button>
      
      <div className='generated_pass'>
        <input 
          defaultValue={password}
          type={!passwordShown ? 'text' : 'password'}
          disabled
        />
        {!passwordShown ? <i id='hide' onClick={togglePassword} className="fa-solid fa-eye-slash"></i> : <i id='show' onClick={togglePassword} className="fa-solid fa-eye"></i>}

        &nbsp;
        <OverlayTrigger
          key='right'
          placement='right'
          overlay={
            <Tooltip id='tooltip-right'>
              {copied ? 'Copied!' : 'Copy to clipboard.'}
            </Tooltip>
          }
        >
          <i onClick={copy} className="fa-solid fa-copy"></i>
        </OverlayTrigger>
      </div>

      {loggedIn && 
        <AddOns 
          password={password}
          setOptions={setOptions}
          setPassword={setPassword}
          fetch={props.fetch}/>}

    </div>
  );
}
 
export default GeneratePass;