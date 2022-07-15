const Mock = require('mockjs');
// 获取 mock.Random 对象
const Random = Mock.Random;
// mock一组班级列表默认数据
let classList = [];
for (let i = 0; i < 8; i++) {
  let newArticleObject = {
    name: Random.integer(0,20) +"班", // Random.cname() 随机生成一个常见的中文姓名
    count:Random.integer(30,50)
  }
  classList.push(newArticleObject)
}

//班级列表
const classList0 = function (opts) {
  return {
    list:classList,code:0
  }
}
Mock.mock('/classList', /post|get/i, classList0); //当post或get请求到/list路由时Mock会拦截请求并返回上面的数据

//班级新增
const classAdd = function (opts) {
  var item = JSON.parse(opts.body)
  classList.push(item)
  return {
    list:classList,code:0
  }
}
Mock.mock('/classAdd', /post|get/i, classAdd);

//班级修改
const classEdit = function (opts) {
  var item = JSON.parse(opts.body)
  classList[item.index].name = item.info.name
  classList[item.index].count = item.info.count
  return {
    list:classList,code:0
  }
}
Mock.mock('/classEdit', /post|get/i, classEdit);

//班级删除
const classClear = function (opts) {
  var item = JSON.parse(opts.body)
  classList.splice(item.index,1)
  return {
    list:classList,code:0
  }
}
Mock.mock('/classClear', /post|get/i, classClear);


// mock一组学生列表默认数据
let studentList = [];
for (let i = 0; i < 8; i++) {
  let newArticleObject1 = {
    name: Random.cname(),
    count:Random.integer(10,20)
  }
  studentList.push(newArticleObject1)
}

//学生列表
const studentList0 = function (opts) {
  return {
    list:studentList,code:0
  }
}
Mock.mock('/studentList', /post|get/i, studentList0);

//学生新增
const studentAdd = function (opts) {
  var item = JSON.parse(opts.body)
  studentList.push(item)
  return {
    list:studentList,code:0
  }
}
Mock.mock('/studentAdd', /post|get/i, studentAdd);

//学生修改
const studentEdit = function (opts) {
  var item = JSON.parse(opts.body)
  studentList[item.index].name = item.info.name
  studentList[item.index].count = item.info.count
  return {
    list:studentList,code:0
  }
}
Mock.mock('/studentEdit', /post|get/i, studentEdit);

//学生删除
const studentClear = function (opts) {
  var item = JSON.parse(opts.body)
  studentList.splice(item.index,1)
  return {
    list:studentList,code:0
  }
}
Mock.mock('/studentClear', /post|get/i, studentClear);