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
  fs.stat(path.join(__dirname, 'project-dist', 'style.css'), (err) => {
    if (err) {
      fs.writeFile(path.join(__dirname, 'project-dist', 'style.css'), '', (err) => {
        if(err) {
          console.log(err);
        }
      })
    }
  });


  const pathToSourceStylesFolder = path.join(__dirname, 'styles');
  const pathToGoalStyles = path.join(__dirname, 'project-dist', 'style.css');

  fs.readdir(pathToSourceStylesFolder, (err, files) => {
    if(err) {
      console.log(err);
    }
  
    files.forEach(item => {
      const pathToStylesFile = path.join(pathToSourceStylesFolder, item);
      fs.readFile(pathToStylesFile, (err, content) => {
        if(err) {
          console.log(err);
        }
        fs.appendFile(pathToGoalStyles, content, (err) => {
          if(err) {
            console.log(err);
          }
        })
      })
    })
  
  })


  // copy assets
/*   fs.stat(path.join(__dirname, 'project-dist', 'assets'), (err) => {
    if(err) {
      fs.mkdir(path.join(__dirname, 'project-dist', 'assets'), (err) => {
        if(err) {
          console.log('error');
        }
      })
    }
  })

  const pathToSourceFolderAssets = path.join(__dirname, 'assets');
  const pathToGoalFolderAssets = path.join(__dirname, 'project-dist', 'assets');


  fs.readdir(pathToSourceFolderAssets, {withFileTypes: true}, (error, files) => {
    if(error) {
      console.log(2)
    }

    files.forEach(item => {

      if(item.isDirectory()) {
        copyFileFunction(path.join(pathToSourceFolderAssets, item.name), item.name);
      }
    })
  });

  function copyFileFunction(pathToFolder, nameFolder) {
    fs.stat(path.join(__dirname, 'project-dist', 'assets', nameFolder), (err) => {
      if(err) {
        fs.mkdir(path.join(__dirname, 'project-dist', 'assets', nameFolder), (err) => {
          if(err) {
            console.log('error');
          }
        })
      }
    })










  }
 */





} catch (error) {
  console.log('error');
}
