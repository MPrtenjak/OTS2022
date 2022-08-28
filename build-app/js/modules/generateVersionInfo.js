'use strict'

const fs = require('fs');

function readFile(fileName) {
  return fs.readFileSync(fileName).toString()
}

function writeFile(fullFileName, data) {
  fs.writeFileSync(fullFileName, data);
}

function generateNewFileVersion(currentVersion) {
  let pattern = /(\d*)\.(\d*)\.(\d*)/
  let match = pattern.exec(currentVersion)
  if (match.length != 4) return null;

  var nextVersion = parseInt(match[3]) + 1
  return `${match[1]}.${match[2]}.${nextVersion}`
}

function run(cwd) {
  return new Promise((resolve, reject) => {
    let fileName = `${cwd}\\build-app\\build-info.json`
    let data = readFile(fileName)
    let jsonData = JSON.parse(data);
    let version = generateNewFileVersion(jsonData.currentVersion);

    if (!version)
      reject('Napaka pri določanju nove verzije programa');

    jsonData.currentVersion = version
    writeFile(fileName, JSON.stringify(jsonData));
    resolve(version);
  })
}

module.exports = {
  run
}