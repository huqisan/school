const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组数据
const produceData = function (opt) {
  let articles = [];
  for (let i = 0; i < 8; i++) {
    let newArticleObject = {
      name: Random.integer(0,20) +"班", // Random.cname() 随机生成一个常见的中文姓名
      count:Random.integer(30,50)
    }
    articles.push(newArticleObject)
  }
  console.log("articles",articles)
  return {
    list:articles,code:0
  }
}
Mock.mock('/list', /post|get/i, produceData); //当post或get请求到/list路由时Mock会拦截请求并返回上面的数据


// mock一组数据
const studentList = function (opt) {
  let articles1 = [];
  for (let i = 0; i < 8; i++) {
    let newArticleObject1 = {
      name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      count:Random.integer(10,20)
    }
    articles1.push(newArticleObject1)
  }
  console.log("articles1",articles1)
  return {
    list:articles1,code:0
  }
}
Mock.mock('/studentList', /post|get/i, studentList); //当post或get请求到/studentList路由时Mock会拦截请求并返回上面的数据