var
  express = require('express')
, bodyParser = require('body-parser')
, compression = require('compression')
, app = module.exports = express();

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', function (req, res, next)
{
  if (~req.originalUrl.indexOf('?'))
    res.redirect('/');
  else
    next();
});

app.use(express.static(__dirname + '/../'));

app.use('*', function (req, res)
{
  res.redirect('/');
});

app.listen(process.env.PORT || 9000);
