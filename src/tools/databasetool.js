//mongodb的代码
const MongoClient = require("mongodb").MongoClient;
// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = "szhmqd27";

/**
 * 暴露出一个方法，插入一条数据
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const insertSingle = (collectionName,data,callback) => {
    console.log(callback)
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到db
          const db = client.db(dbName);
    
          // 拿到集合
          const collection = db.collection(collectionName);

          collection.insertOne(data,(err,result)=>{
              // 关闭数据库
              client.close();
              // 执行回调函数，传递结果给控制器
              callback(err,result)
          })

    })
}

/**
 * 
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findYige = (collectionName,data,callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到db对象
          const db = client.db(dbName);
    
          // 要到要操作的集合 accountInfo
          const collection = db.collection(collectionName);

          // 调用mongodb的findOne方法
          collection.findOne(data,(err,doc)=>{
              // 关闭数据库
              client.close();
              // 执行回调函数，把结果传递调用它的控制器
              callback(err,doc)
          })
    })
}

/**
 * 查询多个
 * @param {*} collectionName 集合名称
 * @param {*} data 数据
 * @param {*} callback 回调，把结果告知控制器
 */
const findMany = (collectionName,data,callback) => {
    MongoClient.connect(
        url,
        { useNewUrlParser: true },
        function(err, client) {
          // 拿到db对象
          const db = client.db(dbName);
    
          // 要到要操作的集合 accountInfo
          const collection = db.collection(collectionName);

          // 查询多个
          collection.find(data).toArray((err,docs)=>{
              // 关闭数据库
              client.close();
              // 执行回调函数，把结果传递调用它的控制器
              callback(err,docs)
          })
    })
}

module.exports = {
    insertSingle,
    findYige,
    findMany
}