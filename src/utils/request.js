import axios from 'axios';
// 导入Vue Router和Element Plus通知组件
import router from '@/router'
import { ElNotification } from 'element-plus';

const request = axios.create({
  baseURL: 'http://localhost:80/api/',
  timeout: 10 * 1000,  // 设置请求超时时间，单位是毫秒
});

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage中获取令牌
    const token = localStorage.getItem('token');
    // 如果令牌存在，将其添加到请求头中
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  error => {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);


// 响应拦截器
request.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response.data;
  },
  error => {
    console.log(error)
    // 检查错误的响应并检查状态码
    if (error.response && error.response.status === 401) {
      // 保存当前路由路径
      localStorage.setItem('redirectUrl', router.currentRoute.value.fullPath);
      // 如果状态码是401，没有授权，跳转到登录页面
      router.push('/login');
      
      // 显示一个友好的错误提示
      ElNotification({
        title: '认证错误',
        message: '请登录以继续',
        type: 'error',
        showClose: false,
      });
    }
    
    // 如果状态码不是401，或者没有错误响应，只需将错误传递给下一个处理程序
    return Promise.reject(error);
  }
);

export default request;
