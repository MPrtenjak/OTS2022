const clean = require('./modules/clean')

let cwd = __dirname + '\\..\\..';

console.log('Cleaning...')
clean.Run(cwd)
  .catch((err) => { console.log("NAPAKA:", err); });
