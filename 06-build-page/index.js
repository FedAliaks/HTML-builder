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
  });


  // copy assets
  fs.stat(path.join(__dirname, 'project-dist', 'assets'), (err) => {
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

  fs.readdir(pathToSourceFolderAssets, {withFileTypes: true}, (err, files) => {
    if(err) {
      console.log(err);
    }

    files.forEach(item => {
      if(item.isDirectory()) {
        fs.stat(path.join(__dirname, 'project-dist', 'assets', item.name), (err) => {
          if(err) {
            fs.mkdir(path.join(__dirname, 'project-dist', 'assets', item.name), (err) => {
              if(err) {
                console.log('error');
              }
            })
          }
        });
        copyFileFunction(path.join(pathToSourceFolderAssets, item.name), path.join(pathToGoalFolderAssets, item.name));
      }
    })
  });

  function copyFileFunction(pathToStartFolder, pathToGoalFolder) {
    fs.readdir(pathToGoalFolder, (err, files) => {
      if (err) {
        /* console.log('error') */
      } else {
        files.forEach(item => {
          fs.unlink(path.join(pathToGoalFolder, item), (err) => {
            if(err) console.log('error');
          })
        });
      }
    });

    fs.readdir(pathToStartFolder, (err, files) => {
      if(err) {
        console.log(err);
      }
      files.forEach(item => {
        fs.copyFile(path.join(pathToStartFolder, item), path.join(pathToGoalFolder, item), err => {
          if(err) {
            console.log(err);
          }
        });
      })
    });
  }


  //create HTML






} catch (error) {
  console.log('error');
}
