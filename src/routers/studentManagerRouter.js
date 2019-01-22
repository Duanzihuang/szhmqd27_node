const express = require("express");
const path = require("path");

//创建路由对象
const studentManagerRouter = express.Router();

//导入控制器
const studentManagerController = require(path.join(
  __dirname,
  "../controllers/studentManagerController.js"
));

//处理请求
// 获取学生列表
studentManagerRouter.get("/list", studentManagerController.getStudentListPage);

// 获取新增页面
studentManagerRouter.get("/add", studentManagerController.getAddStudentPage);

// 新增学生信息
studentManagerRouter.post("/add", studentManagerController.addStudent);

//导出
module.exports = studentManagerRouter;
