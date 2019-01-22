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

// 获取修改页面
// 动态路径参数 以冒号开头
studentManagerRouter.get("/edit/:studentId",studentManagerController.getEditStudentPage);

// 修改学生信息
studentManagerRouter.post("/edit/:studentId",studentManagerController.editStudent);

// 删除学生信息
studentManagerRouter.get('/delete/:studentId',studentManagerController.deleteStudent)

//导出
module.exports = studentManagerRouter;
