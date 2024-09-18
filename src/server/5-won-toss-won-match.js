const fs = require('fs');
const path = require('path');

// Simplified read and write functions
const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');


// Function to calculate number of times each team won the toss and match
function calculateTossAndMatchWins(matches) {
  const tossAndMatchWins = {};

  
  // Iterate over matches using a for loop
  for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      const tossWinner = match.toss_winner;
      const matchWinner = match.winner;

      if (!tossAndMatchWins[tossWinner]) {
          tossAndMatchWins[tossWinner] = { tossWins: 0, matchWins: 0 };
      }
      if (!tossAndMatchWins[matchWinner]) {
          tossAndMatchWins[matchWinner] = { tossWins: 0, matchWins: 0 };
      }

      // Update toss wins
      tossAndMatchWins[tossWinner].tossWins += 1;

      // Update match wins if the toss winner also won the match
      if (tossWinner === matchWinner) {
          tossAndMatchWins[matchWinner].matchWins += 1;
      }
  }

  return tossAndMatchWins;
}

// Main function to read data and calculate toss-match wins, then write to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const tossAndMatchWins = calculateTossAndMatchWins(matches);
  
  writeJSONToFile(path.join(__dirname, '../public/output/won-toss-won-match.json'), tossAndMatchWins);
}

main();
