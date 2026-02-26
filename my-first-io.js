const fs = require('fs');

const filePath = process.argv[2];
const contents = fs.readFileSync(filePath, 'utf8');

const lines = contents.split('\n').length - 1;
console.log(lines);
