import request from '../utils/request';

// 登录获取token和用户信息
export async function Login(body) {
  return request(`${API_AUTH_URL}/v1/token`, {
    method: 'POST',
    data: body,
  });
}
