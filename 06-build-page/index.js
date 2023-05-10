const path = require('path');
const fs = require('fs');
const promise = require('fs/promises');


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

  (async function() {
    try {
      await promise.rm(path.join(__dirname, 'project-dist', 'assets'), { recursive: true, force: true})

    } catch(error) {
      console.log('here err')
    }
  })


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
/*     fs.readdir(pathToGoalFolder, (err, files) => {
      if (err) {
        console.log('error')
      } else {
        files.forEach(item => {
          fs.unlink(path.join(pathToGoalFolder, item), (err) => {
            if(err) console.log('error');
          })
        });
      }
    }); */

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
  async function createHtml() {
    const componentsPath = path.join(__dirname, 'components');
    const templatePath = path.join(__dirname, 'template.html');
    const goalHtmlPath = path.join(__dirname, 'project-dist', 'index.html');
    let htmlCode = await promise.readFile(templatePath, 'utf-8');
    let componentsFiles = await promise.readdir(componentsPath, { withFileTypes: true });
    for (let item of componentsFiles) {
      const pathToComponentsFile = path.join(componentsPath, item.name);
      const content = await promise.readFile(pathToComponentsFile, 'utf-8');
      const regularExpression = item.name.replace(/\.[^/.]+$/, "");
      htmlCode = htmlCode.replace(`{{${regularExpression}}}`, content);
    };

    await promise.writeFile(goalHtmlPath, htmlCode);
    console.log('all OK')
  }

  (async () => {
    createHtml();
  })();




