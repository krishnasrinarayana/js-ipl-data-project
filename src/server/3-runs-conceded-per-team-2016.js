const fs = require('fs');
const path = require('path');


// Simplified read and write functions
const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');


// Function to calculate extra runs conceded per team in 2016
function extraRunsConcededIn2016(matches, deliveries) {
  const result = {};

  
  //  Filter matches for the year 2016 and get their match IDs
  const matches2016 = [];
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    if (match.season === "2016") {
      matches2016.push(match.id);  // Collect match IDs for the year 2016
    }
  }

  //  Iterate through deliveries and sum up the extra runs conceded by each bowling team in 2016 matches
  for (let i = 0; i < deliveries.length; i++) {
    const delivery = deliveries[i];

    // Check if the delivery belongs to a match in 2016
    if (matches2016.includes(delivery.match_id)) {
      const bowlingTeam = delivery.bowling_team;
      const extraRuns = Number(delivery.extra_runs);

      if (!result[bowlingTeam]) {
        result[bowlingTeam] = 0;  // Initialize if team does not exist
      }

      result[bowlingTeam] += extraRuns;  // Add the extra runs conceded by the team
    }
  }

  return result;
}

// Main function to read data, calculate extra runs conceded, and write results to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const deliveries = readJSONFromFile(path.join(__dirname, '../data/deliveries.json'));

  const runsConceded2016 = extraRunsConcededIn2016(matches, deliveries);
  writeJSONToFile(path.join(__dirname, '../public/output/runs-conceded-per-team-2016.json'), runsConceded2016);
}

main();
