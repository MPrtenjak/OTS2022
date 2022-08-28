'use strict'

const fs = require('fs');

function readFile(fileName) {
  return fs.readFileSync(fileName).toString()
}

function writeFile(fullFileName, data) {
  fs.writeFileSync(fullFileName, data);
}

let nastavitve = {
  "mnet": {
    "location": "/ots2022/"
  },
}

let type = "mnet"
/*
if ((process.argv.length > 1) && (process.argv[2] == "sola")) type = "sola"
if ((process.argv.length > 1) && (process.argv[2] == "produkcija_01")) type = "produkcija_01";
if ((process.argv.length > 1) && (process.argv[2] == "produkcija_02")) type = "produkcija_02";
*/

let nastavitev = nastavitve[type];

let cwd = __dirname + '\\..\\..\\pozdrav\\dist\\wwwroot';

console.log('Repairing index.html...')
  let fileName1 = `${cwd}\\index.html`
  let content = readFile(fileName1);
  let pattern = /<base href=".*"/
  let match = pattern.exec(content)
  if (match.length != 1) return null;

  console.log({ match })

  let newBaseValue = "<base href=\"" + nastavitev.location + "\""
  content = content.replace(match[0], newBaseValue)

  writeFile(fileName1, content);
console.log('...index.html repaired')