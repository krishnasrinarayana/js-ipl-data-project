const fs = require('fs');
const path = require('path');

// Simplified read and write functions
const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

// Function to find the highest number of dismissals by one player over another
function highestDismissalsByBowler(deliveries) {
  const dismissals = {};

  for (let i = 0; i < deliveries.length; i++) {
    const delivery = deliveries[i];
    const bowler = delivery.bowler;
    const batsman = delivery.batsman;
    const dismissalKind = delivery.dismissal_kind;

    if (dismissalKind && dismissalKind !== "run out") {
      const key = `${bowler}-${batsman}`;
      if (!dismissals[key]) {
        dismissals[key] = { bowler, batsman, count: 0 };
      }
      dismissals[key].count++;
    }
  }

  let highestDismissal = { count: 0 };

  for (const key in dismissals) {
    if (dismissals[key].count > highestDismissal.count) {
      highestDismissal = dismissals[key];
    }
  }

  return highestDismissal;
}

// Main function to read data, calculate highest dismissals, and write results to a file
function main() {
  const deliveries = readJSONFromFile(path.join(__dirname, '../data/deliveries.json'));
  const highestDismissal = highestDismissalsByBowler(deliveries);
  writeJSONToFile(path.join(__dirname, '../public/output/8-player-dismissed-by-another-playernod.json'), highestDismissal);

}

main();
