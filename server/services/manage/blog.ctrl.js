/**
 * @desc 管理员管理文章模块
 * @dateTime 2020-12-9
 **/

var express = require('express');
var ObjectID = require('mongodb').ObjectID;
const {
  BlogModel,
  BlogTypeModel
} = require('../../database/manage/blog.db.js');
const blogRouter = express.Router();

//新增文章
blogRouter.post('/addBlog', function (req, res, next) {
  let params = req.body;
  let BlogModel1 = new BlogModel({
    title: params.title, //访问页面名字
    content: params.content, //内容文本
    createTime: new Date().getTime(), //创建时间
    updateTime: new Date().getTime(), //发布时间
    interviewNum: params.interview || 0, //访问数
    tag: params.tag, //标签
    links: params.links, //相关链接
  })
  BlogModel1.save(function (err, doc) {
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
});
//删除文章
blogRouter.post('/deleteBlog', function (req, res, next) {
  let params = req.body;
  BlogModel.remove({
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
});
//修改文章
blogRouter.post('/updateBlog', function (req, res, next) {
  let params = req.body;
  let newValue = {
    title: params.title,
    content: params.content,
    tag: params.tag,
    links: params.links,
    updateTime: new Date().getTime()
  }
  BlogModel.updateOne({
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
});
//查询文章列表
blogRouter.get('/queryBlogList', function (req, res, next) {
  let query = req.query;
  let tagRes = query.tagKey || ""; //标签关键字
  let params = {
    key: query.key,
    start: query.startTime || new Date(2020, 1, 1),
    end: query.endTime || new Date(),
  }
  let queryRes = new RegExp(params.key, 'i'); //正则模糊查询参数
  let keyList = {
    title: queryRes,
    created: {
      $gte: params.start,
      $lte: params.end
    }
  }
  if (tagRes) {
    keyList.tag = {
      $in: [tagRes], //匹配所有tag中包含某个关键字的集合
    }
  }
  BlogModel.find(keyList, {
    content: 0
  }).sort({
    "created": -1
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
});
//查询文章
blogRouter.get('/queryBlogDetail', function (req, res, next) {
  let params = req.query;
  BlogModel.update({
    _id: ObjectID(params.id)
  }, {
    $inc: {
      "interviewNum": 1
    }
  }, function (err, doc) {
    if (err) {
      console.error(err)
    } else {
      console.log(doc)
    }
  });
  BlogModel.find({
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
        data: doc
      });
    }
  })
});
//新增类型
blogRouter.post('/addBlogType', function (req, res, next) {
  let params = req.body;
  let BlogTypeModel1 = new BlogTypeModel({
    name: params.name, //名字
    status: params.status, //状态
    dependence: params.dependence, //从属
  })
  BlogTypeModel1.save(function (err, doc) {
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
});
//删除类型
blogRouter.post('/deleteBlogType', function (req, res, next) {
  let params = req.body;
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  BlogTypeModel.remove({
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
});
//修改类型
blogRouter.post('/updateBlogType', function (req, res, next) {
  let params = req.body;
  let newValue = {
    name: params.name,
    status: params.status,
    dependence: params.dependence,
  }
  if (!params.id) {
    return res.json({
      code: 500,
      message: "缺少参数id"
    });
  }
  BlogTypeModel.updateOne({
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
});
//查询类型列表
blogRouter.get('/queryBlogTypeList', function (req, res, next) {
  let query = req.query;
  BlogTypeModel.find({}, function (err, doc) {
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
});
//查询最受欢迎文章列表
blogRouter.get('/queryPopularBlogList', function (req, res, next) {
  let query = req.query;
  let num = query.num || 5; //默认前五条
  BlogModel.find({}).sort({
    "interviewNum": -1
  }).limit(num).exec(function (err, doc) {
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
});


module.exports = blogRouter;
