/**
 * Module dependencies.
 */
var app = require('./app');
var config = require('../config')
var debug = require('debug')('mathonline:server');

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
/**
 * Create HTTP server.
 */
console.log("process.env.NODE_ENV==1111111111111111111==>>",process.env.NODE_ENV)
//生产环境.https证书
if(process.env.NODE_ENV == "development"){
  var http = require('http');
  app.set('port', port);
  var server = http.createServer(app);
}else {
  //https证书
  var http= require("https");
  var fs = require("fs");
  var path = require('path')
  //var privateKey  =  fs.readFileSync( path.join(__dirname, '/util/idiil.com.cn.key'), '', 'utf8');
  //var certificate =  fs.readFileSync(path.join(__dirname, '/util/idiil.com.cn.chained.crt'), '', 'utf8');
  var privateKey  =  fs.readFileSync('/etc/nginx/ssl/idiil.com.cn.key', '', 'utf8');
  var certificate =  fs.readFileSync('/etc/nginx/ssl/idiil.com.cn.chained.crt', '', 'utf8');
  var credentials = {key: privateKey, cert: certificate};
  app.set('port', port);
  var server = http.createServer(credentials,app);
  console.log("55555555555555555555555---https")
}


/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log("Listening... "+port)
}
