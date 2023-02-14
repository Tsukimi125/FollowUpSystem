import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/', //静态资源

  define: {
    // RBAC_URL: '/#/applications',
    // RBAC_URL: 'http://123.57.32.124/',
    RBAC_URL: '/#/login',
    API_URL: 'http://27.17.30.150:40589', // 生产服务器API地址，本系统
    API_AUTH_URL: 'http://27.17.30.150:40581', // 生产服务器API地址,用户管理系统
    API_RECORD_URL: 'http://27.17.30.150:40586', // 测试服溯源API地址
    API_SECRET_KEY: 'XXXXXXXXXXXXXXXX', // API调用密钥
    // GGTJ_API: 'api',
    GGTJ_API: 'http://27.17.30.150:40589',
    PROJECT_ID: 7,
  },
});
