var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');
const globals = require('../globals');

/* GET tracks. */
router.get('/', function (req, res, next) {
  console.log('filename: ' + req.query.filename);
  if (req.query.filename && req.query.filename != '') {
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

module.exports = router;
