var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var logger = require('morgan');
var cors = require('cors');
//var session = require('express-session')
var fileUpload = require('express-fileupload');//文件上传
var cookieParser = require('cookie-parser')
var history = require('connect-history-api-fallback')

var indexRouter = require('./routes/index')
var apiRouter = require('./api/index')

const app = express()

app.set('views', path.join(__dirname, 'views'));//设置模板路径
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(express.static('dist'));//设置dist为根目录

app.use(history())// 引入history模式让浏览器进行前端路由页面跳转
app.use(logger('dev'));
app.use(cors());//同源策略
app.use(cookieParser());
app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit:'100mb',extended: false }));//// 解析表单post数据，请求数据参数的大小
app.use(express.static('uploadFiles'));//设置dist为根目录

//热更新模块
console.log("process.env.NODE_ENV====>>",process.env.NODE_ENV);
if (process.env.NODE_ENV == "development") {
  console.log("development ... hot modules.....");
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackdev = require('../build/webpack.dev.conf');
  const compiler = webpack(webpackdev);
  app.use(webpackDevMiddleware(compiler, {
    publicPath: webpackdev.output.publicPath,
    hot: true,
    noInfo: true,
    stats: { colors: true }
  }))
  var hotMiddleware = webpackHotMiddleware(compiler);
  app.use(hotMiddleware)
  compiler.plugin('compilation', function (compilation) {//webpack编译完成
    //在这个插件合成出页面之后，添加一个回调，调用中间件emit一个action为reload的事件，对应另一边client订阅的事件，实现浏览器的刷新
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      hotMiddleware.publish({action: 'reload'})
      cb()
    })
  });
}
app.use('/', indexRouter);
// 使用路由
app.use('/api', apiRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  console.log("404--------------404----进来了----------404")
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error',{});
});
module.exports = app
