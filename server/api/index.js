const express = require('express')
const userRouter = require('../services/user.ctrl.js')
const manageRouter = require('../services/manage/index.ctrl.js')
const fileDeal = require('../services/upload.ctrl.js');
const tencentRouter = require('../services/tencent.ctrl.js');
const wechatRouter = require('../services/wechat.ctrl.js');
const apiRouter = express.Router()


apiRouter.use('/user', userRouter)
apiRouter.use('/file', fileDeal)
apiRouter.use('/manage', manageRouter);
apiRouter.use('/tencent', tencentRouter);
apiRouter.use('/wechat', wechatRouter);

module.exports = apiRouter;
