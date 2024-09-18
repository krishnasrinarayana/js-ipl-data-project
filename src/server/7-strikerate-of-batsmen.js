const fs = require('fs');
const path = require('path');


// Simplified read and write functions
const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

// Function to calculate strike rates per season
function strikeRatePerSeason(matches, deliveries) {
  const result = {};

  // Loop over matches
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const matchId = match.id;
    const season = match.season;

    // Loop over deliveries
    for (let j = 0; j < deliveries.length; j++) {
      const delivery = deliveries[j];

      if (delivery.match_id === matchId) {
        const batsman = delivery.batsman;
        const runs = parseInt(delivery.batsman_runs);
        const ball = 1;

        if (!result[season]) {
          result[season] = {};
        }
        if (!result[season][batsman]) {
          result[season][batsman] = { runs: 0, balls: 0 };
        }

        // Update batsman's stats
        result[season][batsman].runs += runs;
        result[season][batsman].balls += ball;
      }
    }
  }

  // Calculate strike rates
  const strikeRates = {};
  for (const season in result) {
    strikeRates[season] = {};
    for (const batsman in result[season]) {
      const { runs, balls } = result[season][batsman];
      const strikeRate = (runs / balls) * 100;
      strikeRates[season][batsman] = strikeRate;
    }
  }

  return strikeRates;
}



// Main function to read data, calculate strike rate per season, and write results to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const deliveries = readJSONFromFile(path.join(__dirname, '../data/deliveries.json'));
  
  const strikeRate = strikeRatePerSeason(matches, deliveries);
  writeJSONToFile(path.join(__dirname, '../public/output/strikerate-of-batsmen.json'), strikeRate);
}

main();