/*
 * @Descripttion: prod 下的配置文件，覆盖默认配置
 * @Author: linkenzone
 * @Date: 2021-03-20 23:41:59
 * 配置文件文档 : https://umijs.org/config/
 */

import { defineConfig } from 'umi';

export default defineConfig({
  publicPath: '/', // 配置 webpack 的 publicPath
  webpack5: {
    // lazyCompilation: {},
  },
  /**
   * 导出的多环境变量命名约定：一律大写且采用下划线分割单词
   * 注意：在添加变量后，需要在src/typing.d.ts内添加该变量的声明，否则在使用变量时IDE会报错。
   */
  define: {
    // RBAC_URL: 'https://www.rayplus.top:4000',
    RBAC_URL: '/#/login',

    API_URL: 'https://www.rayplus.top:85', // 生产服务器API地址，本系统
    API_AUTH_URL: 'https://www.rayplus.top:90', // 生产服务器API地址,用户管理系统
    API_RECORD_URL: 'https://www.rayplus.top:86', // 测试服溯源API地址
    API_SECRET_KEY: 'XXXXXXXXXXXXXXXX', // API调用密钥

    GGTJ_API: 'http://59.110.44.236:9001',
    PROJECT_ID: 6,
  },
});
