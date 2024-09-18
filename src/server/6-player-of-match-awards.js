
const fs = require('fs');
const path = require('path');

const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');


function findTopPlayerOfTheMatch(matches) {
    const seasonAwards = {};

    // Collect award counts per season using a for loop
    for (let i = 0; i < matches.length; i++) {
        const match = matches[i];
        const season = match.season;
        const player = match.player_of_match;

        if (!seasonAwards[season]) {
            seasonAwards[season] = {};
        }

        if (!seasonAwards[season][player]) {
            seasonAwards[season][player] = 0;
        }

        seasonAwards[season][player] += 1;
    }

    // Find the top player for each season using for loops
    const topPlayers = {};

    for (const season in seasonAwards) {
        let maxAwards = 0;
        let topPlayer = '';

        for (const player in seasonAwards[season]) {
            if (seasonAwards[season][player] > maxAwards) {
                maxAwards = seasonAwards[season][player];
                topPlayer = player;
            }
        }

        topPlayers[season] = { player: topPlayer, awards: maxAwards };
    }

    return topPlayers;
}



// Main function to read data, calculate top players, and write results to a file
function main() {
    const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
    const playerOfMatchAwards = findTopPlayerOfTheMatch(matches);

    writeJSONToFile(path.join(__dirname, '../public/output/player-of-match-awards.json'), playerOfMatchAwards);
}

main();


