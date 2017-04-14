const express = require('express')

let appData = require('../data.json');
let seller = appData.seller;
let goods = appData.goods;
let ratings = appData.ratings;

let apiRoutes = express.Router();

apiRoutes.get('/seller', function (req, res) {
  res.json({
    errno: 0,
    data: seller
  });
});

apiRoutes.get('/goods', function (req, res) {
  res.json({
    errno: 0,
    data: goods
  });
});

apiRoutes.get('/ratings', function (req, res) {
  res.json({
    errno: 0,
    data: ratings
  });
});

module.exports = apiRoutes
