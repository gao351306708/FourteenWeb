/**
 * @desc 管理员管理模块
 * @dateTime 2020-12-9
 **/

var express = require('express');
const manageRouter = express.Router();
const blogRouter = require('./blog.ctrl.js')
const staticRouter = require('./static.ctrl.js')
const websitRouter = require('./websit.ctrl.js')

manageRouter.use('/', blogRouter)
manageRouter.use('/', staticRouter)
manageRouter.use('/', websitRouter)

module.exports = manageRouter;
