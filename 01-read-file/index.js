const fs = require('fs');
const path = require('path');
const { stdout } = process;

const readableStream = fs.createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
let answerString = '';
readableStream.on('data', chunk => answerString += chunk);
readableStream.on('end', () => stdout.write(answerString));