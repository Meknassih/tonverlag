var express = require('express');
var router = express.Router();

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
  res.render('uploadView', { title: 'Tonverlag' });
});

router.post('/', upload.single('audioFile'), function (req, res, next) {
  console.log('BODY : ' + JSON.stringify(req.body));
  console.log(req.file);
  console.log(req.body);
  if (!req.file)
    return res.status(400).send('Missing audio file.');
  if (acceptedMimeTypes.findIndex(type => type == req.file.mimetype) === -1)
    return res.status(400).send('Unsupported audio file. Supported : ' + JSON.stringify(acceptedMimeTypes));

  res.status(201).send('Saved ' + req.file.originalname);
});

module.exports = router;
