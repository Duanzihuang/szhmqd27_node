const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname, "../tools/databasetool.js"));
/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */
const getStudentListPage = (req, res) => {
  const keyword = req.query.keyword || "";

  databasetool.findMany(
    "studentInfo",
    { name: { $regex: keyword } },
    (err, docs) => {
      // 这个里面的代码，是当databasetool中findMany执行了callback
      // callback中会把 err,docs传递过来
      // 渲染页面的代码
      const html = template(path.join(__dirname, "../public/views/list.html"), {
        students: docs,
        keyword
      });

      res.send(html);
    }
  );
};

/**
 * 返回新增页面
 */
const getAddStudentPage = (req, res) => {
  const html = template(path.join(__dirname, "../public/views/add.html"), {});
  console.log(html);
  res.send(html);
};

/**
 * 新增学生信息
 */
const addStudent = (req, res) => {
  databasetool.insertSingle("studentInfo", req.body, (err, result) => {
    if (!result) {
      //失败
      res.send(`<script>alert("插入失败!")</script>`);
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`);
    }
  });
};

/**
 * 获取修改页面
 */
const getEditStudentPage = (req, res) => {
  // 必须按照它规定的处理，你才能拿到数据
  const _id = databasetool.ObjectId(req.params.studentId);
  databasetool.findYige("studentInfo", { _id }, (err, doc) => {
    // 根据数据，重新渲染得到的新页面
    const html = template(
      path.join(__dirname, "../public/views/edit.html"),
      doc
    );

    res.send(html);
  });
};

const editStudent = (req, res) => {
  // 必须按照它规定的处理，你才能拿到数据_id值
  const _id = databasetool.ObjectId(req.params.studentId);

  databasetool.updateYige("studentInfo", { _id }, req.body, (err, result) => {
    if (!result) {
      //失败
      res.send(`<script>alert("修改失败!")</script>`);
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`);
    }
  });
};

module.exports = {
  getStudentListPage,
  getAddStudentPage,
  addStudent,
  getEditStudentPage,
  editStudent
};
