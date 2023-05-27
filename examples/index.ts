// TEST MISSPELLING FULL NAMES
//---------------------------------------

import { namesFuzzyMatch } from "..";


const requiredName = {
    firstName: "John",
    middleName: "F",
    lastName: "Doe",
    // secondLastName: "Smith"
};
  
/// Misspelled full names, change order, add extra words, remove words, etc
let targetMisspelledFullNamesArray = [
    "Dow Jonn Franciss",
    "John Do",
    "Dow John",
    "Don Juan",
    "Doe John",
    "John Doe 2"
];

     
// call the nameMatch function for each misspelled full name as a target.
// use the original full name as the first argument

for (let i = 0; i < targetMisspelledFullNamesArray.length; i++) {
    let targetFullName = targetMisspelledFullNamesArray[i];
    let res = namesFuzzyMatch(requiredName, targetFullName);
    console.log('-------------');
    console.log(`Target: ${targetFullName}:\n`);
    console.log(`\t Total score: ${res.averageScore}`);
    console.log(`\t Matches:`);
    for (let j = 0; j < res.matches.length; j++) {
        console.log(`\t ${res.matches[j].key} -> match: ${res.matches[j].match?.item} score: ${res.matches[j].match?.score}`);
    }
    console.log('-------------');
}

console.log("done");
  