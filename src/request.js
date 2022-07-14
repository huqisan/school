import axios from "axios";
import qs from 'qs';
// import Vue from 'vue';
axios.defaults.timeout = 12000 // 请求超时时间
axios.defaults.baseURL = ''
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8' // post请求头的设置


// axios 请求拦截器
axios.interceptors.request.use(
  config => {
    // 可在此设置要发送的token
    // let token = store.getters['login/token'];
    // token && (config.headers.token = token)
    console.log("444")
    // this.$message({
    //     message:'加载中...',
    //     duration:0
    // })
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
// axios respone拦截器
axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误 结合自身业务和后台返回的接口状态约定写respone拦截器
    console.log("555")
    // this.$message.clear()
    console.log('response', response);
    if (response.status === 200 && response.data.code === 0) {
      return Promise.resolve(response)
    } else {
      // this.$message({
      //   message:response.data.msg,
      //   duration:2000
      // })
      return Promise.reject(response)
    }
  },
  error => {
    // this.$message.clear()
    console.log("error",error)
    const responseCode = error.response.status
    switch (responseCode) {
      // 401：未登录
      case 401:
        // this.$message({
        //     message:'未登录',
        //     duration:2000
        //   })
        break
        // 404请求不存在
      case 404:
        // this.$message({
        //     message:'网络请求不存在',
        //     duration:2000
        //   })
        break
      default:
        // this.$message({
        //     message:error.response.data.message,
        //     duration:2000
        //   })
    }
    return Promise.reject(error)
  }
)
/**
 * 封装get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
 function get(url, params = {}) {
    console.log("111",url,params)
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params: params
        })
        .then(res => {
            console.log("222",url)
          resolve(res.data)
        })
        .catch(err => {
            console.log("333",url,err)
          reject(err.data)
        })
    })
  }
  /**
   * post方法，对应post请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
  function post(url, params={}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(params))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err.data)
        })
    })
  }
  
  export default {
    get,
    post
  }
  
