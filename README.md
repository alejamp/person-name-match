# person-name-match

Suppose that in an application there is a form where the user enters his full name in separate fields:

  - FirstName
  - Middle Name
  - Last Name
  - Second Last Name

Then in a different CIP process using OCR or other means, the user's full name is captured in a single field or several fields, but not necessarily in the same order as the form. OCR's are not perfect and can make mistakes, so the name may not be captured correctly.
Error goes from misspelling to missing names or adding extra names or change the order of the names.
So using fast-fuzzy library this simple project tries to solve this problem.

The objective of this project is to create a function that receives the name entered by the user and the name captured by the OCR and returns a score of how similar they are.

Example of use, for a misspelled lat name and order change:


```javascript
const requiredName = {
    firstName: "John",
    lastName: "Doe",
};
  
let res = namesFuzzyMatch(requiredName, "Dow Jonn Franciss");

// response:
// Test on: Dow Jonn Franciss:
// Total score: 0.7083333333333334
// Success: true
// Reason: Average score is 0.7083333333333334
// Matches:
// 	 firstName -> match: Jonn score: 0.75
// 	 lastName -> match: Dow score: 0.6666666666666667
```

If last name is more important and you can accept a lower score, you can use the lastNameMinTreshold parameter, for example set it to 0.9:

```javascript
const requiredName = {
    firstName: "John",
    lastName: "Doe",
};
  
let res = namesFuzzyMatch(requiredName, "Dow Jonn Franciss", {
    lastNameMinTreshold: 0.9,
});

// response:
// Test on: Dow Jonn Franciss:
// Total score: 0.7083333333333334
// Success: false
// Reason: Best last name match has score less than lastNameMinTreshold=0.9
// Matches:
// 	 firstName -> match: Jonn score: 0.75
// 	 lastName -> match: Dow score: 0.6666666666666667

```
As levenstein distance between Doe and the nearest match Dow is 0.6^ < 0.9, the match is rejected.



To use this function, the following conditions must be met:
- There must be a structured name, a sort of user declaration in a form.
- The target is a string that represents the full name obtained by another means, in this case we assume an OCR.
- The set of names from OCR must be greater than or equal to the one declared by the user.
- The absence of a name declared by the user in the captured by OCR is punished in the score


This funtion will no fire an exception if the name is not found, it will always return a report with the score and the reason of the score.