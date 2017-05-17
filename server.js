var express         = require('express')
    , path          = require('path')
    , logger        = require('morgan')
    , cookieParser  = require('cookie-parser')
    , bodyParser    = require('body-parser')
    , fs            = require('fs')
    , http          = require('http')
    , https         = require('https')
    , request       = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'server/views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(bodyParser.json({ type: 'application/json', limit: '10mb' }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.resolve('src/assets')));

app.use(function (req, res, next) {
    if (!/https/.test(req.protocol) && process.env.ENV !== "dev") {
        res.redirect("https://" + req.headers.host + req.url);
    } else {
        return next();
    }
});

app.get('*', (req, res) => {
  if (process.env.ENV === "dev")  res.render('index', {devENV: true});
  else                            res.render('index');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const server = http.createServer(app).listen(process.env.PORT || 5000);
server.on('listening', function() {
  console.info("\x1b[32m", '=> Server listening on port', process.env.PORT || 5000);
});

try {
	var options = {
    key: fs.readFileSync('/tls/current.key'),
    cert: fs.readFileSync('/tls/current.chain')
  };

  https.createServer(options, app).listen(443);
} catch (error) {
	console.log(error);
	console.log("SSL certs not found");
}

module.exports = app;