
/*
Functions used to generate passwords depending on the options chosen by the user:
1. Generate depending on Length.
2. Generate depending if it's lowercase, uppercase, has symbols or numbers.
*/

// To randomize the order of characters added depending on which checkboxes were checked.
export const shuffle = (characters) => {
  return characters.split('').sort((a, b) => { 
    return Math.random() - 0.5; 
  }).join('');
};


//To generate a random password:
export const generatePassword = (shuffledCharacters, length) => {
  let result = '';
    for (let i = 1; i <= length; i++) {
      result += shuffledCharacters.charAt(Math.floor(Math.random() * shuffledCharacters.length));
    }

    return result;
};

