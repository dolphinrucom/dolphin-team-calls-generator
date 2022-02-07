const fs = require('fs');
const shuffleArray = require('shuffle-array');
const arrayRandomElement = require('array-random-item');
const HOW_MUCH = 4;

const employees = shuffleArray(
  fs
  .readFileSync('employees.txt')
  .toString()
  .split('\n')
  .map(e => e.trim())
  .filter(e => e.length > 0)
);

const counts = {};
const buddies = {}

const incrementCountOfUses = function (employee) {
  if (!counts[employee]) {
    counts[employee] = 1;
  } else {
    counts[employee]++;
  }
}

for (let i = 1; i <= HOW_MUCH; i++) {
  for (const employee of employees) {
    if (typeof buddies[employee] === 'undefined') {
      buddies[employee] = [];
    }

    let attempts = 0;
    let candidateAccepted = false;
    
    while (!candidateAccepted && attempts <= employees.length) {
      attempts++;
      const candidate =  arrayRandomElement(employees);

      if (typeof buddies[candidate] === 'undefined') {
        buddies[candidate] = [];
      }
      
      if (
        buddies[employee].indexOf(candidate) === -1
        && buddies[employee].length < HOW_MUCH
        && buddies[candidate].length < HOW_MUCH
        && candidate !== employee
        && (typeof counts[candidate] === 'undefined' || counts[candidate] < HOW_MUCH)
      ) {
        buddies[employee].push(candidate);
        buddies[candidate].push(employee);
        incrementCountOfUses(candidate);
        candidateAccepted = true;
      }
    }
  }
}

for (const employee in buddies) {
  console.log(`👤 \`${employee}\` 👉🏻 \`${buddies[employee].join(', ')}\``)
}