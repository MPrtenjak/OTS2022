'use strict'

const exec = require('child_process').exec;

function runCommand (command, showOutput) {
  // showOutput = true;
  return new Promise((resolve, reject) => {
    if (showOutput) console.log(`Izvajam ukaz: [${command}]`)
    exec(command, (err, stdout, stderr) => {
      if (err) {
        if (stderr) return reject(stderr);
        if (stdout) return reject(stdout);
        return reject(err);
      }

      if (showOutput) console.log(stdout)
      return resolve();
    });
  });
}

//
// options = { platform, parameters, showOutput }
//
function runBat(cwd, batName, options) {
  options = options || { }
  let platform = options.platform
  let parameters = options.parameters
  let showOutput = options.showOutput

  let command = (platform) ? `"${cwd}\\build-app\\bat\\${platform}\\${batName}.bat"` : `"${cwd}\\build-app\\bat\\${batName}.bat"`;
  return runCommand(command + " " + parameters, showOutput);
}

module.exports = {
  runCommand,
  runBat
}