const path = require('path');
const fs = require('fs');
const promise = require('fs/promises');

try {
  const pathToGoalFolder = path.join(__dirname, 'project-dist');

  //create folder

  fs.stat(pathToGoalFolder, (err) => {
    if(err) {
      fs.mkdir(pathToGoalFolder, (err) => {
        if(err) {
          console.log('error');
        }
      })
    }
  })





  //copy styles
  const pathToSourceStylesFolder = path.join(__dirname, 'styles');
  const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

  fs.readdir(pathToSourceStylesFolder, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log('error');
    }
    files.forEach(item => {
      const arr = [];
      const pathToFile = path.join(__dirname, 'styles', item.name);
      const readableStream = fs.createReadStream(pathToFile, 'utf-8');
      readableStream.on('data', chunk => {
        arr.push(chunk);
      });
      readableStream.on('end', () => {
        output.write(arr.join(''));
      });
    })
  })



  // copy assets
/*   promise.mkdir(path.join(__dirname, 'project-dist', 'assets'))
  const pathToSourceAssetsFolder = path.join(__dirname, 'assets');
  const pathToGoalAssetsFolder = path.join(__dirname, 'project-dist', 'assets'); */
/*   fs.readdir(pathToGoalAssetsFolder, (err, files) => {
    if(err) {
      console.log('error1');
    }

    files.forEach((item) => {
      fs.unlink(path.join(pathToGoalAssetsFolder, item), (err) => {
        if(err) {
          console.log('error');
        }
      })
    })


  }) */

/*   fs.readdir(pathToSourceAssetsFolder, (err, files) => {
    if(err) {
      console.log('error1')
    }
    console.log(files);
    files.forEach(item => {
      fs.copyFile(path.join(pathToSourceAssetsFolder, item), path.join(pathToGoalAssetsFolder, item), (err) => {
        if(err) {
          console.log(err);
        }
      })
    })
  }) */



/*   fs.readdir(pathToSourceFolder, (err, files) => {
    files.forEach(item => {
      fs.copyFile(path.join(pathToSourceFolder, item), path.join(pathToGoalFolder, item), err => {
        if(err) {
          console.log(err);
        }
      });
    })
  }); */
} catch (error) {
  console.log('error');
}
