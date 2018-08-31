var express = require('express');
var xml2json = require('./xml2json');
var json2xml = require('./json2xml');
var router = express.Router();

/* POST */
router.post('/xml2json', function(req, res) {
  //console.log("reqqq bdy",req);
  //  console.log("printing xml", req.rawBody);
    res.send(xml2json(req.rawBody));
//  res.send(xml2json(req));
});

/* POST */
router.post('/json2xml', function(req, res) {
  //console.log("reqqq bdy",req);
  //  console.log("printing xml", req.rawBody);
    res.send(json2xml(req.body));
//  res.send(xml2json(req));
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
