const fs = require('fs');
const path = require('path');


const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');

function findBestEconomyInSuperOvers(deliveries) {
    const superOverDeliveries = [];
    const bowlerStats = {};

    // Filter deliveries to include only those from Super Overs
    for (let i = 0; i < deliveries.length; i++) {
        if (deliveries[i].over > 6) {
            superOverDeliveries.push(deliveries[i]);
        }
    }

    // Calculate runs conceded and overs bowled by each bowler in Super Overs
    for (let i = 0; i < superOverDeliveries.length; i++) {
        const delivery = superOverDeliveries[i];
        const bowler = delivery.bowler;
        const runsConceded = Number(delivery.total_runs);
        const overs = 1 / 6; // Each delivery is a fraction of an over

        if (!bowlerStats[bowler]) {
            bowlerStats[bowler] = { runs: 0, balls: 0 };
        }

        bowlerStats[bowler].runs += runsConceded;
        bowlerStats[bowler].balls += overs;
    }

    let bestEconomyRate = Infinity;
    let bestBowler = '';

    // Find the bowler with the best economy rate
    for (const bowler in bowlerStats) {
        const { runs, balls } = bowlerStats[bowler];
        const economyRate = runs / balls;

        if (economyRate < bestEconomyRate) {
            bestEconomyRate = economyRate;
            bestBowler = bowler;
        }
    }

    return { bowler: bestBowler, economyRate: bestEconomyRate };
}


// Main function to read data, calculate strike rate per season, and write results to a file
function main() {
   
    const deliveries = readJSONFromFile(path.join(__dirname, '../data/deliveries.json'));
    
    const bestEconomy = findBestEconomyInSuperOvers(deliveries);
    writeJSONToFile(path.join(__dirname, '../public/output/best-economy-superover.json'), bestEconomy);
  }
  
  main();