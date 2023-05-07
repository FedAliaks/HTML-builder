const path = require('path');
const fs = require('fs');
const promise = require('fs/promises');

try {
  promise.mkdir(path.join(__dirname, 'files-copy'), {recursive: true});

  const pathToSourceFolder = path.join(__dirname, 'files');
  const pathToGoalFolder = path.join(__dirname, 'files-copy');

  fs.readdir(pathToGoalFolder, (err, files) => {
    if (err) {
      console.log('error')
    }
    files.forEach(item => {
      fs.unlink(path.join(pathToGoalFolder, item), (err) => {
        if(err) console.log('error');
      })
    });
  })

  fs.readdir(pathToSourceFolder, (err, files) => {
    files.forEach(item => {
      fs.copyFile(path.join(pathToSourceFolder, item), path.join(pathToGoalFolder, item), err => {
        if(err) {
          console.log(err);
        }
      });
    })
  });
} catch (error) {
  console.log(error.message);
}
