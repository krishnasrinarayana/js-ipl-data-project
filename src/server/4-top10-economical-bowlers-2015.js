const fs = require('fs');
const path = require('path');

// Simplified read and write functions
const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');




function top10EconomicalBowlersIn2015(matches, deliveries) {
    const bowlersData = {};
    const matches2015 = [];
  
    // Iterate through matches and collect match IDs for 2015
    for (let i = 0; i < matches.length; i++) {
      const match = matches[i];
      if (match.season === "2015") {
        matches2015.push(match.id);
      }
    }
  
    // Iterate through deliveries and collect data for bowlers in 2015 matches
    for (let i = 0; i < deliveries.length; i++) {
      const delivery = deliveries[i];
  
      // Check if the delivery belongs to a match in 2015
      if (matches2015.includes(delivery.match_id)) {
        const bowler = delivery.bowler;
        const runsConceded = Number(delivery.total_runs);  // Total runs conceded by the bowler in that delivery
        const isLegalDelivery = delivery.wide_runs === "0" && delivery.noball_runs === "0";  // Only legal deliveries count as balls bowled
  
        // Initialize bowler's data if not present
        if (!bowlersData[bowler]) {
          bowlersData[bowler] = { runsConceded: 0, ballsBowled: 0 };
        }
  
        // Add runs conceded
        bowlersData[bowler].runsConceded += runsConceded;
  
        // Add one ball bowled if it's a legal delivery
        if (isLegalDelivery) {
          bowlersData[bowler].ballsBowled += 1;
        }
      }
    }
  
    // Convert balls bowled to overs and calculate economy rate for each bowler
    const bowlerEconomyRates = [];
    for (const bowler in bowlersData) {
      const { runsConceded, ballsBowled } = bowlersData[bowler];
      const oversBowled = ballsBowled / 6;  // Convert balls to overs
      const economyRate = oversBowled > 0 ? runsConceded / oversBowled : 0;
  
      bowlerEconomyRates.push({
        bowler,
        economyRate,
        oversBowled,
        runsConceded,
      });
    }
  
    // Sort bowlers by economy rate in ascending order and get the top 10
    const top10Bowlers = bowlerEconomyRates
      .filter(bowler => bowler.oversBowled >= 10)  // Optional: Ensure bowler bowled at least 10 overs
      .sort((a, b) => a.economyRate - b.economyRate)
      .slice(0, 10);
  
    return top10Bowlers;
  }
  

// Main function to read data, calculate top economical bowlers, and write results to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const deliveries = readJSONFromFile(path.join(__dirname, '../data/deliveries.json'));

  const top10Bowlers2015 = top10EconomicalBowlersIn2015(matches, deliveries);
  writeJSONToFile(path.join(__dirname, '../public/output/4-top10-economical-bowlers-2015.json'), top10Bowlers2015);
}

main();
