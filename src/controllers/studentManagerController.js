const path = require("path");
const template = require("art-template");
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";
// Database Name
const dbName = "szhmqd27";

/**
 * 返回列表页面
 * @param {*} req
 * @param {*} res
 */
const getStudentListPage = (req, res) => {
  const keyword = req.query.keyword || ''

  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      // 拿到的数据库db对象
      const db = client.db(dbName);

      // 拿到要操作的集合
      const collection = db.collection("studentInfo");

      // 查询多条
      collection.find({name:{$regex:keyword}}).toArray((err, docs) => {
        client.close();

        // 渲染页面的代码
        const html = template(path.join(__dirname, "../public/views/list.html"), {students:docs,keyword});
        
        res.send(html);
      });
    }
  );
};

module.exports = {
  getStudentListPage
};
