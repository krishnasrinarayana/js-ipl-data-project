
  const fs = require('fs');
  const csv = require('csv-parser');
  const path = require('path');
  

  const deliveriesCsvFile = path.join(__dirname, 'deliveries.csv');
  const matchesCsvFile = path.join(__dirname, 'matches.csv');

  
  function csvToObjectSync(filePath){
    const result = [];
  
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => result.push(data))
      .on('end', () => {
        const writeStream =fs.createWriteStream(filePath.replace('.csv','.json'))
        writeStream.write(JSON.stringify(result,null,2), 'utf-8')
      
  });
}


function convertAndWriteFileSync(){
  csvToObjectSync(matchesCsvFile);
  csvToObjectSync(deliveriesCsvFile)

}  
convertAndWriteFileSync()
  
  

  
