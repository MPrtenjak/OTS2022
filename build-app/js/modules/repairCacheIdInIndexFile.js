'use strict'

const fs = require('fs');

function readFile(fileName) {
  return fs.readFileSync(fileName).toString()
}

function writeFile(fullFileName, data) {
  fs.writeFileSync(fullFileName, data);
}

function run(cwd, newVersion) {
  return new Promise((resolve, reject) => {
    let fileName = `${cwd}\\pozdrav\\dist\\wwwroot\\index.html`
    let content = readFile(fileName);
    let pattern = /\?cache_version=(\d)*/g
    let newValue = "?cache_version=" + newVersion
    content = content.replace(pattern, newValue)
    writeFile(fileName, content);

    resolve();
  })
}

module.exports = {
  run
}
