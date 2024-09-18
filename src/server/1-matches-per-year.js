const fs = require('fs');
const path = require('path');


const readJSONFromFile = (filePath) => JSON.parse(fs.readFileSync(filePath, 'utf8'));
const writeJSONToFile = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');



function calculateMatchesPerYear(matches) {
    const matchCountPerYear = {};
  
   
      // Extract the year by season
      for(let i=0;i<matches.length;i++){
      let year = matches[i].season
  
      // Check if the year is already in the matchCountPerYear object
      if (!matchCountPerYear[year]) {
        matchCountPerYear[year] = 0;
      }
  
      // Increment the count for the year
      matchCountPerYear[year]++;
    }
  
    return matchCountPerYear;
  }



// Main function to read data, calculate matches per year, and write results to a file
function main() {
  const matches = readJSONFromFile(path.join(__dirname, '../data/matches.json'));
  const matchesPerYear = calculateMatchesPerYear(matches);
  writeJSONToFile(path.join(__dirname, '../public/output/matches-per-year.json'), matchesPerYear);
}

main();



