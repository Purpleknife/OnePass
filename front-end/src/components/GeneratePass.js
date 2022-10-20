import React from 'react';

import './GeneratePass.scss';

const GeneratePass = () => {
  return (
    <div className='generate_form'>
      <div className='title'>
        Generate your password <i class="fa-solid fa-key-skeleton"></i><br />
        Choose your prefered options then click on Generate.
      </div>
      
      <div className='options'>
        <span>Length: <i class="fa-solid fa-square-minus"></i> 0 <i class="fa-solid fa-square-plus"></i></span>
        <span><input type="checkbox" id="lowercase" name="lowercase" value="Lowercase" /> Lowercase</span>
        <span><input type="checkbox" id="uppercase" name="uppercase" value="Uppercase" /> Uppercase</span>
        <span><input type="checkbox" id="symbol" name="symbol" value="Symbols" /> Symbols</span>
        <span><input type="checkbox" id="numbers" name="numbers" value="Numbers" /> Numbers</span>
      </div>

      <button className='generate_btn'>Generate</button>
      <div className='generated_pass'>
        password <i class="fa-solid fa-eye-slash"></i> <i class="fa-solid fa-eye"></i>
      </div>
    </div>
  );
}
 
export default GeneratePass;