var express = require('express');
var router = express.Router();
const db = require('../db/db');

/* GET home page. */
router.get('/', function (req, res, next) {
  db.query(`SELECT * FROM public."Track" ORDER BY "listenCount" DESC`,
    (err, response) => {
      if (err) {
        console.error('PG ' + JSON.stringify(err));
        res.status(513);
        res.render('indexView', {
          locals: {
            notification: {
              type: 'danger',
              message: `Tracks could not be retrieved at this time.`
            }
          }
        });
      } else {
        console.log('PG ' + JSON.stringify(response.rows));
        res.status(200);
        res.render('indexView', {
          locals: {
            tracks: response.rows
          }
        });
      }
    });
});

module.exports = router;
