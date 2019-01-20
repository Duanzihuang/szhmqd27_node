const path = require("path");
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "szhmqd27";
/**
 * module.exports = {
 *  getRegisterPage:箭头函数
 * }
 * 导出的一个方法，该方法获取注册页面
 */
exports.getRegisterPage = (req, res) => {
  // 内部就是对 fs.readFile 的封装
  res.sendFile(path.join(__dirname, "../public/views/register.html"));
};

/**
 * 导出的注册方法
 */
exports.register = (req, res) => {
  const result = {
    status: 0,
    message: "注册成功"
  };
  //1、拿到浏览器传输过来数据 (body-parser ===> app.js )
  const { username } = req.body;

  //2、先判断数据库中用户名，是否存在，如果存在返回提示 (mongodb)
  // Use connect method to connect to the server
  MongoClient.connect(
    url,
    { useNewUrlParser: true },
    function(err, client) {
      // 拿到db
      const db = client.db(dbName);

      // 拿到集合
      const collection = db.collection("accountInfo");

      // 查询一个
      collection.findOne({ username }, (err, doc) => {
        // 如果result == null 没有查询到，就可以插入，如果查询到了，说明用户名已经存在
        if (doc) {
          // 存在
          result.status = 1;
          result.message = "用户名已经存在";

          // 关闭数据库
          client.close();

          // 返回
          res.json(result);
        } else {
          //3、如果用户名不存在，插入到数据库中
          // result2 有值，代表成功 result2 为null就是失败
          collection.insertOne(req.body, (err, result2) => {
            if (!result2) {
              // 失败
              result.status = 2;
              result.message = "注册失败";
            }

            // 关闭数据库
            client.close();

            // 返回
            res.json(result);
          });
        }
      });
    }
  );
};
