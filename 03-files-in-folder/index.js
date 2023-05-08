const path = require('path');
const fs = require('fs');


const pathToFolder = path.join(__dirname, 'secret-folder');

fs.readdir(pathToFolder, {withFileTypes: true}, (err, files) =>{
  if(err) console.log(err.message);
  files.forEach(item => {
    const pathToFile = path.join(pathToFolder, item.name);
    fs.stat(pathToFile, (err, statistic) => {
      if(item.isFile()) {
        console.log(path.parse(pathToFile).name + " - " + path.parse(pathToFile).ext.slice(1) + " - " + `${(statistic.size / 1000).toFixed(2)}Kb`);
      }
    })
  })

})