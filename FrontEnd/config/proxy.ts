/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2020-09-10 20:03:51
 */
import proxy from './proxy';

/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */

//mock: 'http://39.96.191.139:3000/mock/18',

export default {
  dev: {
    '/rbac': {
      target: 'http://27.17.30.150:40581',
      changeOrigin: true,
      pathRewrite: {
        '^/rbac': '',
      },
    },
    '/api': {
      target: 'http://27.17.30.150:40589',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    },
    '/record': {
      target: 'http://27.17.30.150:40586',
      changeOrigin: true,
      pathRewrite: {
        '^/record': '',
      },
    },
  },
  test: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
