const path = require("path");
const template = require("art-template");
const databasetool = require(path.join(__dirname,"../tools/databasetool.js"))
/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */
const getStudentListPage = (req, res) => {
  const keyword = req.query.keyword || ''

  databasetool.findMany('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
    // 这个里面的代码，是当databasetool中findMany执行了callback
    // callback中会把 err,docs传递过来
    // 渲染页面的代码
    const html = template(path.join(__dirname, "../public/views/list.html"), {students:docs,keyword});
        
    res.send(html);
  })
};

/**
 * 返回新增页面
 */
const getAddStudentPage = (req,res) => {
  const html = template(path.join(__dirname, "../public/views/add.html"),{})
  console.log(html)
  res.send(html)
}

/**
 * 新增学生信息
 */
const addStudent = (req,res)=>{
  databasetool.insertSingle('studentInfo',req.body,(err,result)=>{
    if(!result){ //失败
      res.send(`<script>alert("插入失败!")</script>`)
    } else {
      res.send(`<script>location.href='/studentmanager/list'</script>`)
    }
  })
}

module.exports = {
  getStudentListPage,
  getAddStudentPage,
  addStudent
};
