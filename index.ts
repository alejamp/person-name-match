/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */

import { search, fuzzy, MatchData } from "fast-fuzzy";


export interface IPersonName {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  secondLastName?: string;
}

export interface IPersonNameMatchOptions {
  normalizeWhiteSpace?: boolean;
  removeSpecialCharacters?: boolean;
  ignoreCase?: boolean;
  lastNameMinTreshold?: number;
}

export interface IPersonNameMatchResult {
  success?: boolean;
  averageScore?: number;
  reason?: string;
  matches?: any;
}


export function namesFuzzyMatch(name: IPersonName, targetFullName: string, options?: IPersonNameMatchOptions): IPersonNameMatchResult {

    let opts = {
        normalizeWhiteSpace: true,
        removeSpecialCharacters: true,
        ignoreCase: true,
        lastNameMinTreshold: undefined,
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

    let matches: any[]= [];
    let result: IPersonNameMatchResult= {};
    for (const key in name) {
      if (Object.prototype.hasOwnProperty.call(name, key)) {
        const e = (name as any)[key];
        if (e) {
          const match = search(e, targetFullNameArray, { returnMatchData: true, ignoreCase: opts.ignoreCase });
          const bestMatch = match?.[0];

          matches.push({
            key: key,
            match: bestMatch
          });

          if (key === "lastName" && opts.lastNameMinTreshold) {
            if ((bestMatch?.score ?? 0) < opts.lastNameMinTreshold) {
              result = {
                success: false,
                averageScore: 0,
                reason: `Best last name match has score less than lastNameMinTreshold=${opts.lastNameMinTreshold}`,
                matches: matches
              };
            }
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


    result = {
      success: result.success ?? true,
      averageScore: averageScore,
      matches: matches,
      reason: result.reason ?? `Average score is ${averageScore}` 
    };

    return result;
}


