import axios from 'axios'
import stores from "../vuex/store"
import router from '../router/router.js'
axios.defaults.baseURL = 'http://www.pan-zoe.com'

axios.interceptors.request.use(function (config) {
  stores.commit('setShowLoading', true)
  return config;
}, function (error) {
  stores.commit('setShowLoading', false)
  // 对请求错误做些什么
  return Promise.reject(error);
})

axios.defaults.timeout = 5000 //接口请求时间
axios.interceptors.response.use((response) => {
  stores.commit('setShowLoading',false)
  if (response.data.code == 'error') {
    return Promise.reject(response)
  }
  return response;
},(err)=>{
  stores.commit('setShowLoading',false);
  if (err.response.status === 401) { //
    stores.commit('setUser',null);
    stores.commit('setToken', null);
    // return Promise.reject(err);
    if (router.currentRoute.name !== 'login') {
      Swal.fire({
        title: '马上去登录吧~',
        text: "您还未登录，请先登录吧~",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#21BA45',
        cancelButtonColor: '#d33',
        confirmButtonText: '去登录',
        cancelButtonText: '不了',
      }).then((result) => {
        if (result.value) {
          return router.push('/login')
        }
      });
    }




  }
  return Promise.reject(err.response);
});

export const http =  (uri,data = null,method = 'GET',Authorization = true,config = null) =>{
  let da = method.toLocaleLowerCase() === 'get' ? 'params' : 'data';
  let _default = {
    url:'/api/'+uri,
    [da]:data,
    method:method,
    headers:{},
  };
  if (config){ //如果有其他的headers 就合并
    Object.assign(_default,config)
  }
  if (Authorization){
    Object.assign(_default.headers,{
      Authorization: stores.state.token ? stores.state.token.access_token : ''
    })
  }
    return axios.request(_default);
}

