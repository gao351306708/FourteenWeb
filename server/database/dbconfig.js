/**
 * 数据库连接基本信息设置，使用连接池来达到资源复用
 * Created by gaoju on 2018/10/30.
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

//数据库链接基本配置
const mongodbConfig = {
  "host": "localhost",
  "port": "27017",
  "db": "managementWeb"
};

/**
 * 配置 MongoDb options
 */
function getMongodbConfig() {
  let options = {
      useNewUrlParser: true,
      poolSize: 5, // 连接池中维护的连接数
      reconnectTries: Number.MAX_VALUE,
      keepAlive: 120,
  }
  return options;
};

/**
 * 拼接 MongoDb Uri
 *
 */
function getMongoUrl() {
  let mongoUrl = 'mongodb://';
  mongoUrl += `${mongodbConfig.host}:${mongodbConfig.port}`;
  mongoUrl += `/${mongodbConfig.db}`;

  return mongoUrl;
};
/**
 * 创建 Mongo 连接，内部维护了一个连接池，全局共享
 */
const mongoClient = mongoose.createConnection(
  getMongoUrl(), 
  getMongodbConfig()
);


/**
 * Mongo 连接成功回调
 */
mongoClient.on('connected', function() {
  console.log(new Date().getTime())
  console.log('Mongoose连接至 ：' + getMongoUrl());
});

/**
* Mongo 连接失败回调
*/
mongoClient.on('error', function(err) {
  console.log('Mongoose 连接失败，原因: ' + err);
});
/**
* Mongo 关闭连接回调
*/
mongoClient.on('disconnected', function() {
  console.log('Mongoose 连接关闭');
});

/**
* 关闭 Mongo 连接
*/
function close() {
  mongoClient.close();
}


module.exports = {
  mongoClient: mongoClient,
  close: close,
};