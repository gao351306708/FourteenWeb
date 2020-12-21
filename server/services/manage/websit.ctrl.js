/**
 * @desc 管理员管理统计模块
 * @dateTime 2020-12-9
 **/

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
const websitRouter = express.Router();
const {
  WebsitMenuModel,
  WebsitMenuItemsModel
} = require('../../database/manage/websit.db.js');


/*
 * 查询所有网点
 * */
websitRouter.get('/getAllMenuWithWebsit', async (req, res) => {
  //多表查询
  WebsitMenuModel.aggregate([{
    $lookup: {
      from: "websitmenuitem",
      localField: "modeltype",
      foreignField: "modeltype",
      as: "items"
    }
  }]).sort({
    "sort": 1, //按照modeltype升序查找
  }).exec(function (err, doc) {
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
/*
 * 查询网点菜单
 * */
websitRouter.get('/queryWebsitMenu', async (req, res) => {
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
/*
 * 查询网点
 * */
websitRouter.get('/queryWebsit', async (req, res) => {
  let query = req.query;
  let queryRes = new RegExp(query.key, 'i'); //正则模糊查询参数
  let keyList = {
    title: queryRes || ""
  }
  if (query.modeltype) {
    keyList.modeltype = query.modeltype
  }
  WebsitMenuItemsModel.find(keyList, {
    content: 0
  }).sort({
    "modeltype": 1, //按照modeltype升序查找
  }).exec(function (err, doc) {
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
/*
 * 添加网点菜单
 * */
websitRouter.post('/addWebsitMenu', async (req, res) => {
  let params = req.body;
  let WebsitMenuModel1 = {
    name: params.name, //名字
    modeltype: params.modeltype, //从属
    sort: params.sort, //顺序
  }
  //有modeltype类型的就更新没有就插入
  WebsitMenuModel.update({
    modeltype: params.modeltype
  }, {
    "$set": WebsitMenuModel1
  }, {
    "upsert": "true"
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "新增成功",
        data: doc
      });
    }
  })
})
/*
 * 删除网点菜单
 * */
websitRouter.post('/removeWebsitMenu', async (req, res) => {
  let params = req.body;
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  WebsitMenuModel.remove({
    _id: ObjectID(params.id)
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "删除成功",
        data: doc
      });
    }
  })
})
/*
 * 更新网点菜单
 * */
websitRouter.post('/updateWebsitMenu', async (req, res) => {
  let params = req.body;
  let newValue = {
    name: params.name,
    sort: params.sort, //顺序
  }
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  WebsitMenuModel.updateOne({
    _id: ObjectID(params.id)
  }, {
    $set: newValue
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "修改成功",
        data: doc
      });
    }
  })
})
/*
 * 增加网点
 * */
websitRouter.post('/addWebsit', async (req, res) => {
  let params = req.body;
  let WebsitMenuItemsModel1 = new WebsitMenuItemsModel({
    modeltype: params.modeltype, //从属
    title: params.title,
    logo: params.logo,
    introduce: params.introduce,
    url: params.url
  })
  WebsitMenuItemsModel1.save(function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "新增成功",
        data: doc
      });
    }
  })
})
/*
 * 删除网点
 * */
websitRouter.post('/removeWebsit', async (req, res) => {
  let params = req.body;
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  WebsitMenuItemsModel.remove({
    _id: ObjectID(params.id)
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "删除成功",
        data: doc
      });
    }
  })
})
/*
 * 更新网点
 * */
websitRouter.post('/updateWebsit', async (req, res) => {
  let params = req.body;
  let newValue = {
    modeltype: params.modeltype,
    title: params.title,
    logo: params.logo,
    introduce: params.introduce,
    url: params.url
  }
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  WebsitMenuItemsModel.updateOne({
    _id: ObjectID(params.id)
  }, {
    $set: newValue
  }, function (err, doc) {
    if (err) {
      res.json({
        code: 500,
        message: err.message
      });
    } else {
      res.json({
        code: 200,
        message: "修改成功",
        data: doc
      });
    }
  })
})
module.exports = websitRouter;
