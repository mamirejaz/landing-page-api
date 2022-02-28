var express = require('express')
var router = express.Router()
var mysql = require('mysql');
const { v4: uuidv4 } = require('uuid');

router.get('/hello', function (req, res) {
  res.json('hello world!')
})

router.get('/countries', function (req, res) {

  let con = mysql.createConnection({

    host: 'db-mysql-nyc3-84887-do-user-10953235-0.b.db.ondigitalocean.com', 
    user: 'doadmin',
    password: 'FnOnoUfG0lUFdcrx',
    port: 25060, //port mysql
    database: 'landingpage',
    queryTimeout: 6000,
    connectTimeout: 60000

  });
    con.connect(function (err) {

    con.query("SELECT code, name FROM country", function (error, results, fields) {
      if (error) { res.json(""); }
      else res.json(results);
      con.end();
    });
  });
})

router.post('/userExists', function (req, res) {

  let con = mysql.createConnection({

    host: 'db-mysql-nyc3-84887-do-user-10953235-0.b.db.ondigitalocean.com', 
    user: 'doadmin',
    password: 'FnOnoUfG0lUFdcrx',
    port: 25060, //port mysql
    database: 'landingpage',
    queryTimeout: 6000,
    connectTimeout: 60000

  });

  var table = req.isBusiness ? "business" : "user";
  con.connect(function (err) {

    con.query("SELECT * FROM " + table +" where email = ?", req.body.email, function (error, results, fields) {
      if (error) { res.json(""); }
      else if (results.length > 0) res.json(results[0].email);
      else res.json(false);
      con.end();
    });
  });
})


router.post('/add-user', function (req, res) {
  let con = mysql.createConnection({

    host: 'db-mysql-nyc3-84887-do-user-10953235-0.b.db.ondigitalocean.com', 
    user: 'doadmin',
    password: 'FnOnoUfG0lUFdcrx',
    port: 25060, //port mysql
    database: 'landingpage',
    queryTimeout: 6000,
    connectTimeout: 60000

  });
  var uuid = uuidv4();
  var datetime = new Date();
  var email = req.body.email;
  var country = req.body.country;
  var postalcode = req.body.postalcode;
  var communityId = -1;
  var referralCode = uuidv4();
  var referredByUser = req.referredByUser == undefined ? null : req.referredByUser;
  var referredByBusiness = req.referredByBusiness == undefined ? null : req.referredByBusiness;
  var isActive = 1;
  con.connect(function (err) {
    if (err) { throw err; }
    const result = con.query("INSERT INTO community (postal_code, country_id, is_active) VALUES ?", [[[postalcode, "1", "1"]]], async function (error, results, fields) {
      if (error)
        throw error;
      communityId = results.insertId;
      con.query("INSERT INTO user (uuid, created_at, email, community_id, referral_id, referred_by, referred_by_user, is_active) VALUES ?", [[[uuid, datetime, email, communityId, referralCode, referredByBusiness, referredByUser, isActive]]], function (error, results, fields) {
        if (error) { res.json(""); }
        else res.json(referralCode);
        con.end();
      });
    });
  });
})
router.post('/add-business', function (req, res) {
  let con = mysql.createConnection({

    host: 'db-mysql-nyc3-84887-do-user-10953235-0.b.db.ondigitalocean.com', 
    user: 'doadmin',
    password: 'FnOnoUfG0lUFdcrx',
    port: 25060, //port mysql
    database: 'landingpage',
    queryTimeout: 6000,
    connectTimeout: 60000

  });
  var uuid = uuidv4();
  var datetime = new Date();
  var email = req.body.email;
  var country = req.body.country;
  var postalcode = req.body.postalcode;
  var communityId = -1;
  var referralCode = uuidv4();
  var referredByUser = req.referredByUser == undefined ? null : req.referredByUser;
  var referredByBusiness = req.referredByBusiness == undefined ? null : req.referredByBusiness;
  var isActive = 1;
  con.connect(function (err) {
    if (err) { throw err; }
    const result = con.query("INSERT INTO community (postal_code, country_id, is_active) VALUES ?", [[[postalcode, "1", "1"]]], async function (error, results, fields) {
      if (error)
        throw error;
      communityId = results.insertId;
      con.query("INSERT INTO business (uuid, created_at, email, community_id, referral_id, referred_by, referred_by_business, is_active) VALUES ?", [[[uuid, datetime, email, communityId, referralCode, referredByBusiness, referredByUser, isActive]]], function (error, results, fields) {
        if (error) { res.json(""); }
        else res.json(referralCode);
        con.end();
      });
    });
  });
})
module.exports = router;