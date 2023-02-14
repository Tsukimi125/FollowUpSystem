/*
 * @Descripttion: request 网络请求工具


 * @Author: linkenzone
 * @Date: 2020-09-06 22:13:59
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */

import { extend } from 'umi-request';
import { notification, message } from 'antd';
import Cookies from 'js-cookie';
import { removeNull } from './util';

// #region 设置
const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
  10034: '用户名或密码错误',
};
// const config = {
//   // mock
//   mock: 'http://39.96.191.139:3000/mock/18',
//   mock_auth: 'http://39.96.191.139:81',
//   // 测试服务器地址
//   pre: 'http://27.17.30.150:40585',
//   pre_auth: 'http://27.17.30.150:40581',
//   // 生产环境地址
//   prod: 'http://www.rayplus.top:85',
//   prod_auth: 'http://www.rayplus.top:81',
// };
// #endregion

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: Response }): Response => {
  const { response } = error;
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, url } = response;
    notification.error({
      message: `请求错误 ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  errorHandler, // 默认错误处理
  credentials: 'omit', // 默认请求是否带上cookie
});

const { NODE_ENV } = process.env;
// const ENV = 'prod';

// export const post_prefix = config[ENV];

let COOKIE_CONFIRM = true;

async function custom_request(url: string, { method = 'GET', params = {}, data = {} }) {
  // tf?: boolean,
  // console.log('NODE_ENV', NODE_ENV);

  let prefix: string = '';

  // if (/rbac/.test(url)) {
  //   // 权限管理请求
  //   prefix = API_AUTH_URL;
  //   url = url.slice(5);
  // } else if (/record/.test(url)) {
  //   prefix = API_RECORD_URL;
  //   url = url.slice(7);
  // } else {
  //   // rwe请求
  //   prefix = API_URL;
  // }

  // 下列方案是走proxy，正式环境采用nginx
  // if (url.substr(0, 2) === 'v1' || url.substr(0, 3) === '/v1') {
  //   prefix = API_URL;
  // }
  // if (tf === true) prefix = API_RECORD_URL;

  if (url !== `${API_AUTH_URL}/v1/token` && !Cookies.get('token_7')) {
    // 判断cookie是否失效
    // 防止同时多次请求
    if (!COOKIE_CONFIRM) {
      return false;
      // async修饰下返回值等价于以下
      // return Promise.resolve(false);
    }
    COOKIE_CONFIRM = false;
    message.warning('登录状态失效，请重新登录！');
    window.location.href = `${window.location.origin}/#/login`;
    return false;
    // return Promise.resolve(false);
  }

  if (!COOKIE_CONFIRM) COOKIE_CONFIRM = true; // 防止同时多次请求

  return new Promise((resolve) => {
    request(prefix + url, {
      method,
      params: removeNull(params),
      data: removeNull(data),
      credentials: 'omit',
      headers: {
        // 这里的request的header不能加在extend创建实例里
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token_7')}`,
      },
    }).then((res) => {
      if (res && res.code === 200) {
        // 如果post请求没有data，就返回true，以便判断generator下一步执行
        if (res.total !== undefined) {
          resolve({
            data: res.data,
            total: res.total,
            all_pids: res.all_pids ? res.all_pids : null,
          });
        } else {
          resolve(res.data !== undefined ? res.data : true);
        }
      } else if (res && codeMessage[res.code]) {
        //兼容rbac接口返回的写法（登录走的rbac）
        notification.error({
          message: codeMessage[res.code],
        });
      } else if (res && res.message) {
        notification.error({
          message: res.message,
        });
      }
      resolve(null); // 错误不能reject 会导致generator call函数出错
    });
  });
}

export default custom_request;
