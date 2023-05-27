/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

import { search, fuzzy } from "fast-fuzzy";


export interface IPersonName {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
}


export function namesFuzzyMatch(name: IPersonName, targetFullName: string, options?: {
  normalizeWhiteSpace: boolean,
}): any {

    let opts = {
        normalizeWhiteSpace: true,
        removeSpecialCharacters: true,
        ignoreCase: true,
        ...options ?? {},
    };

    // normalize white spaces
    if (opts.normalizeWhiteSpace) {
      name.firstName = name.firstName?.replace(/\s+/g, " ").trim();
      name.middleName = name.middleName?.replace(/\s+/g, " ").trim();
      name.lastName = name.lastName?.replace(/\s+/g, " ").trim();
      name.secondLastName = name.secondLastName?.replace(/\s+/g, " ").trim();
      targetFullName = targetFullName.replace(/\s+/g, " ").trim();
    }

    // Remove all special characters from string
    if (opts.removeSpecialCharacters) {
      const regex = /[^a-zA-Z ]/g;
      name.firstName = name.firstName?.replace(regex, "");
      name.middleName = name.middleName?.replace(regex, "");
      name.lastName = name.lastName?.replace(regex, "");
      name.secondLastName = name.secondLastName?.replace(regex, "");
      targetFullName = targetFullName.replace(regex, "");
    }

    // split the full name into an array
    let targetFullNameArray = targetFullName.split(" ");

    // for each key in name. Get best match for each from targetFullNameArray
    // using fuzzy search

    let matches: any[] = [];
    for (const key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) {
        const e = (name as any)[key];
        if (e) {
          let match = search(e, targetFullNameArray, { returnMatchData: true, ignoreCase: opts.ignoreCase });
          if (match) {
            matches.push({
              key: key,
              match: match[0],
            });
          }
        }
      }
    }

    // Calculate average match score
    let totalScore = 0;
    for (let i = 0; i < matches.length; i++) {
        totalScore += matches[i].match?.score ?? 0;
    }
    let averageScore = totalScore / matches.length;


    return {
      sourceName: name,
      targetFullName: targetFullName,
      matches: matches,
      averageScore: averageScore
    };

}


// TEST MISSPELLING FULL NAMES
//---------------------------------------


// let name = {
//   firstName: "John",
//   middleName: "F",
//   lastName: "Smith",
//   // secondLastName: "Smith"
// };

// /// Misspelled full names, change order, add extra words, remove words, etc
// let targetMisspelledFullNamesArray = [
//   "Dow Jonn Franciss",
//   // "John Do",
//   // "Dow John",
//   // "Don Juan",
//   // "Doe John",
//   // "John Doe 2"
// ];

   
// // call the nameMatch function for each misspelled full name as a target.
// // use the original full name as the first argument

// for (let i = 0; i < targetMisspelledFullNamesArray.length; i++) {
//   let targetFullName = targetMisspelledFullNamesArray[i];
//   let res = namesFuzzyMatch(name, targetFullName);
//   console.log(res);
// }

// console.log("done");
