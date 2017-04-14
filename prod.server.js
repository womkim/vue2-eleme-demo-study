const express = require('express')
const config = require('./config/index')

const port = process.env.PORT || config.build.port

let app = express()
let router = express.Router()

router.get('/', function (req, res, next) {
  req.url = 'index.html'
  next()
})

app.use(router)

let appData = require('./data.json');
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

app.use('/api', apiRoutes)

app.use(express.static('./dist'))

let uri = 'http://localhost:' + port

let _resolve
let readyPromise = new Promise(resolve => {
  _resolve = resolve
})


console.log('> Starting dev server...')
console.log('> Listening at ' + uri + '\n')


let server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}