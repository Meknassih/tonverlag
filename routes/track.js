var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const globals = require('../globals');

/* GET tracks. */
router.get('/', function (req, res, next) {
  console.log('filename: ' + req.query.filename);
  if (req.query.filename && req.query.filename != '' && req.query.filename.split('.').pop() !== 'png') {
    const fullPathToFile = path.join(globals.uploadsFolder, req.query.filename);
    console.log('fullpath: ' + fullPathToFile);
    fs.exists(fullPathToFile, (exists) => {
      if (exists) {
        res.status(200).sendFile(fullPathToFile);
      } else {
        res.status(404).send('Not Found');
      }
    });
  } else {
    res.status(501).send('Not Implemented');
  }
});

/* GET track waveform image */
router.get('/waveform', function (req, res, next) {
  console.log('filename: ' + req.query.filename);
  if (req.query.filename && req.query.filename != '' && req.query.filename.split('.').pop() === 'png') {
    const fullPathToFile = path.join(globals.uploadsFolder, req.query.filename);
    console.log('fullpath: ' + fullPathToFile);
    fs.exists(fullPathToFile, (exists) => {
      if (exists) {
        res.status(200).sendFile(fullPathToFile);
      } else {
        res.status(404).send('Not Found');
      }
    });
  } else {
    res.status(400).send('Bad Request');
  }
});

module.exports = router;
