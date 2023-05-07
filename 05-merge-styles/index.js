const path = require('path');
const fs = require('fs');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {

  files.forEach(item => {
    const pathToFile = path.join(__dirname, 'styles', item.name);

    if(path.extname(pathToFile) === '.css') {
      const arr = [];
      const readableStream = fs.createReadStream(pathToFile, 'utf-8');
      readableStream.on('data', chunk => {
        arr.push(chunk);
      });
      readableStream.on('end', () => {
        output.write(arr.join(''));
      });
    }

  });
});

