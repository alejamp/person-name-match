// TEST MISSPELLING FULL NAMES
//---------------------------------------

import { namesFuzzyMatch } from "..";


const requiredName = {
    firstName: "John",
    // middleName: "F",
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
    "John Doe 2",
    "John Smith"
];

     

for (let i = 0; i < targetMisspelledFullNamesArray.length; i++) {

    let targetFullName = targetMisspelledFullNamesArray[i];

    // Perform the fuzzy match
    let res = namesFuzzyMatch(requiredName, targetFullName, {
        lastNameMinTreshold: 0.75,
    });

    // Show the results
    console.log(`Test on: ${targetFullName}:\n`);
    console.log(`Total score: ${res.averageScore}`);
    console.log(`Success: ${res.success}`);
    console.log(`Reason: ${res.reason}`);
    console.log(`Matches:`);

    if (!res.matches) {
        console.log(`\t No matches`);
    } else {
        for (let j = 0; j < (res.matches?.length ?? 0) ; j++) {
            console.log(`\t ${res.matches[j].key} -> match: ${res.matches[j].match?.item} score: ${res.matches[j].match?.score}`);
        }
    }
    console.log('-------------');
}

console.log("done");
  