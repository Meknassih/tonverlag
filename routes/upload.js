var express = require('express');
var router = express.Router();
const db = require('../db/db');
const globals = require('../globals');

var multer = require('multer');
var storage = multer.diskStorage({
  destination: globals.uploadsFolder,
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
router.post('/', upload.fields([
  { name: 'audioFile', maxCount: 1 },
  { name: 'imageFile', maxCount: 1 }
]), function (req, res, next) {
  console.log(req.files);
  if (req.files['audioFile'].length < 1) {
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
  if (acceptedMimeTypes.findIndex(type => type == req.files['audioFile'][0].mimetype) === -1) {
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

  db.query(`INSERT INTO public."Track"(
    id, "fileName", "updatedAt", "createdAt", "listenCount", "displayName", "userId", "imageFileName")
    VALUES (DEFAULT, $1, DEFAULT, DEFAULT, 0, $2, $3, $4)`,
    [
      req.files['audioFile'][0].filename,
      req.files['audioFile'][0].originalname.replace(/\.[^/.]+$/, ""),
      undefined,
      req.files['imageFile'][0].filename
    ],
    (err, response) => {
      if (err) {
        console.error('PG ' + JSON.stringify(err));
        res.status(500);
        res.render('uploadView', {
          locals: {
            title: 'Tonverlag',
            notification: {
              type: 'danger',
              message: `Your track ${req.files['audioFile'][0].originalname} could not be saved.`
            }
          }
        });
      } else {
        console.log('PG ' + JSON.stringify(response));
        res.status(201);
        res.render('uploadView', {
          locals: {
            title: 'Tonverlag',
            notification: {
              type: 'success',
              message: `Your new track ${req.files['audioFile'][0].originalname} has been saved.`
            }
          }
        });
      }
    });
});

module.exports = router;
