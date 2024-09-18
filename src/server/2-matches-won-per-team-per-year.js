const fs = require('fs');
const path = require('path');

const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');


// Function to calculate wins per team per year
function calculateWinsPerTeamPerYear(matches) {
  const winsPerTeamPerYear = {};

  // Iterate through the matches array
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const { season, winner } = match;

    // Ensure the year exists in the results object
    if (!winsPerTeamPerYear[season]) {
      winsPerTeamPerYear[season] = {};
    }

    // Ensure the team exists for the specific year
    if (!winsPerTeamPerYear[season][winner]) {
      winsPerTeamPerYear[season][winner] = 0;
    }

    // Increment the count for the winning team
    winsPerTeamPerYear[season][winner]++;
  }

  return winsPerTeamPerYear;
}



// Main function to read data and calculate wins per team per year, then write the result to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const matchesWonperTeamperYear = calculateWinsPerTeamPerYear(matches);
  writeJSONToFile(path.join(__dirname, '../public/output/matches-Won-per-Team-per-year.json'), matchesWonperTeamperYear);
}


main();
