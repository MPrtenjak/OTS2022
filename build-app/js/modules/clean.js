'use strict'

const fs = require('fs');
const dos = require('./runDosCommand')

function removeFolder(folder) {
  let command = `rd "${folder}" /q/s`;
  return dos.runCommand(command);
}

function removeFile(file) {
  return new Promise((resolve, reject) => {
    fs.unlink(file, function (err) {
      if (err) return reject(err);

      return resolve();
    });
  });
}

function findFilesAndFoldersForDeletion(root, filesAndFolders) {
  filesAndFolders = filesAndFolders ||
    {
      files: [],
      folders: []
    };

  var filesInFolder = fs.readdirSync(root);

  const foldersToClean = ['BIN', 'OBJ', 'TESTRESULTS', 'PUBLISH', 'DIST'];
  const filesToClean = ['STYLECOP.CACHE'];

  for (var i in filesInFolder) {
    let fileName = filesInFolder[i];
    let fullFileName = root + '/' + fileName;

    if (fs.statSync(fullFileName).isDirectory()) {
      if (foldersToClean.includes(fileName.toUpperCase()))
        filesAndFolders.folders.push(fullFileName);
      else
        findFilesAndFoldersForDeletion(fullFileName, filesAndFolders);
    } else {
      if (filesToClean.includes(fileName.toUpperCase()))
        filesAndFolders.files.push(fullFileName);
    }
  }

  return filesAndFolders;
}

function deleteFilesAndFolders(filesAndFoldersForDeletion) {
  let folders = Promise.all(filesAndFoldersForDeletion.folders.map((folder) => { return removeFolder(folder); }));
  let files = Promise.all(filesAndFoldersForDeletion.files.map((file) => { return removeFile(file); }));

  return Promise.all([folders, files]);
}

function Run(cwd) {
  let filesAndFoldersForDeletion = findFilesAndFoldersForDeletion(cwd);
  return deleteFilesAndFolders(filesAndFoldersForDeletion);
}

module.exports.Run = Run;