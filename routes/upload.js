var express = require('express');
var router = express.Router();
const db = require('../db/db');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '_' + file.originalname);
  }
});
var upload = multer({ storage });
const acceptedMimeTypes = [
  'audio/mpeg',
  'audio/mp4',
  'video/ogg'
];

/* GET upload page. */
router.get('/', function (req, res, next) {
  res.render('uploadView');
});

/* POST to upload file and return validation page */
router.post('/', upload.single('audioFile'), function (req, res, next) {
  if (!req.file) {
    res.status(400);
    return res.render('uploadView', {
      locals: {
        title: 'Tonverlag',
        notification: {
          type: 'danger',
          message: `You must select an audio file.`
        }
      }
    });
  }
  if (acceptedMimeTypes.findIndex(type => type == req.file.mimetype) === -1) {
    res.status(400);
    return res.render('uploadView', {
      locals: {
        title: 'Tonverlag',
        notification: {
          type: 'danger',
          message: 'Unsupported audio file. Supported : ' + JSON.stringify(acceptedMimeTypes)
        }
      }
    });
  }

  // TODO: test request to be removed
  db.query('SELECT NOW()', (err, response) => {
    if (err)
      console.log('PG ERR' + JSON.stringify(err));
    else
      console.log('PG RESPONSE' + JSON.stringify(response));
  });

  res.status(201);
  res.render('uploadView', {
    locals: {
      title: 'Tonverlag',
      notification: {
        type: 'success',
        message: `Your new track ${req.file.originalname} has been saved.`
      }
    }
  });
});

module.exports = router;
