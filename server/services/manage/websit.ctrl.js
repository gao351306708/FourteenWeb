/**
 * @desc 管理员管理统计模块
 * @dateTime 2020-12-9
 **/

var express = require('express');
const websitRouter = express.Router();
const {
  WebsitMenuModel,
} = require('../../database/manage/websit.db.js');


/*
 * 查询所有网点
 * */
websitRouter.get('/getAllWebsit', async (req, res) => {
  WebsitMenuModel.find({}, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        data: doc
      });
    }
  })
})
module.exports = websitRouter;
