const clean = require('./modules/clean')
const dos = require('./modules/runDosCommand')
const generateVersionInfo = require('./modules/generateVersionInfo')
const repairCacheIdInIndexFile = require('./modules/repairCacheIdInIndexFile')

const BUILD = 1
const PUBLISH = 2


let type = BUILD
if ((process.argv.length > 1) && (process.argv[2] == "publish")) type = PUBLISH

let use_git = (type === PUBLISH)
let doPublish = (type === PUBLISH)

let cwd = __dirname + '\\..\\..';
let newVersion = undefined;
let showOutput = true;

if (showOutput)
  console.log('cwd == ' + cwd)

console.log(use_git ? "\nBuilding and publishing project\n" : "\nBuilding project\n")
console.log('Cleaning...')
clean.Run(cwd)

  .then(() => {
    if (use_git)
      { console.log('Pulling master branch...'); return dos.runBat(cwd, 'get_master_branch', { showOutput }) }
    else
      return Promise.resolve();
  })

  .then(() => {
    if (doPublish) {
      console.log('Generating new version ...'); return generateVersionInfo.run(cwd)
    } else {
      return Promise.resolve("1.0.0");
    }
  })

  .then((ver) => {
    newVersion = ver
    if (doPublish) {
      console.log('New version generated: ', newVersion);
    }

    console.log('Building app...');
    return dos.runBat(cwd, 'build_app', { parameters: newVersion, showOutput })
  })

  .then(() => {
    console.log('rapairing index.html...');
    return repairCacheIdInIndexFile.run(cwd, newVersion)
  })

  .then(() => {
    if (use_git) {
      console.log('Creating tags and pushing info to GIT...')
      let versionTag = `PUBLISH-${newVersion}`
      return dos.runBat(cwd, 'update_master_branch', { parameters: versionTag, showOutput })
    }
    else {
      console.log('Resetting GIT ...')
      return dos.runBat(cwd, 'restore_local_master_branch')
    }
  })

  .then(() => {
    console.log('%c ******************** ', 'background: white; color: red');
    console.log('%c prepared for mnet.si/ots2022 ', 'background: white; color: red');
    console.log('%c ******************** ', 'background: white; color: red');

    return Promise.resolve("");
  })

  .catch((err) => { console.log("NAPAKA:", err); });
