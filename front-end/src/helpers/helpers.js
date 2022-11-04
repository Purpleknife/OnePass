
/*
Functions used to generate passwords depending on the options chosen by the user:
1. Generate depending on Length.
2. Generate depending if it's lowercase, uppercase, has symbols or numbers.
*/
const crypto = require('crypto');


// To randomize the order of characters added depending on which checkboxes were checked.
export const shuffle = (characters) => {
  return characters.split('').sort((a, b) => { 
    return Math.random() - 0.5; 
  }).join('');
};


//To generate a random password:
export const generatePassword = (shuffledCharacters, length) => {
  let output = '';
  const arr = new Uint32Array(length);
  const random = crypto.getRandomValues(arr);

  random.map((i) => {
    output += shuffledCharacters[i % shuffledCharacters.length];
  })

  return output;
};

