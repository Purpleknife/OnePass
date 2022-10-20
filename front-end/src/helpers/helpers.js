
/*
Functions used to generate passwords depending on the options chosen by the user:
1. Generate depending on Length.
2. Generate depending if it's lowercase, uppercase, has symbols or numbers.
*/

const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowercase = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '@#$%&*-';

const generatePassword = (length) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*-';

  let result = '';
    for (let i = 1; i <= length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return result;
};

console.log('generate', generatePassword(6))

const shuffle = (str) => {
  return str.split('').sort((a, b) => { 
    return Math.random() - 1; 
  }).join('');
};

console.log('shuffle', shuffle(generatePassword(6)));

