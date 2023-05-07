const path = require('path');
const fs = require('fs');
const { stdin, stdout } = process;



stdout.write('Add text in newFile.txt\n');

const output = fs.createWriteStream(path.join(__dirname, 'newFile.txt'));

stdin.on('data', (chunk) => {
  let data = chunk.toString().trim();

  if(data === 'exit') {
    process.exit();
  } else {
    output.write(data);
    output.write('\n');
  }
});

process.on('exit', () => stdout.write('File newFile.txt is ready for check. Goodbye!'));
process.on('SIGINT', () => {
  process.exit();
})







