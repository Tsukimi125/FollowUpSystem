/*
 * @Descripttion:
 * @Author: linkenzone
 * @Date: 2020-09-03 14:53:21
 */
import { Login } from '../../services/login';
import { CookieUtil } from '../../utils/cookie';
import { message } from 'antd';

const Model = {
  namespace: 'login',

  state: { tokens: { 1: {}, 2: {} } },

  reducers: {
    add_tokens(state, { payload }) {
      return { ...state, tokens: { ...state.tokens, ...payload } };
    },
    clear_tokens(state) {
      return { ...state, tokens: { 1: {}, 2: {} } };
    },
  },

  effects: {
    *login({ payload }, { call }) {
      const data = yield call(Login, payload);

      if (data) {
        const { token, userInfo } = data;
        // token 过期时间45分钟
        const expires = new Date(+new Date() + 45 * 60 * 1000);

        CookieUtil.set('token', token, expires, '/');
        CookieUtil.set(
          'userInfo',
          JSON.stringify(userInfo),
          new Date(+new Date() + 24 * 60 * 60 * 1000),
        );
        // CookieUtil.set(
        //   'ALTER_can_export',
        //   JSON.stringify(ALTER_can_export),
        //   new Date(+new Date() + 24 * 60 * 60 * 1000)
        // )
        return true;
      }
      return false;
    },
    *login_project({ payload }, { call, put }) {
      const data = yield call(Login, payload);

      // console.log('login_project payload', payload);

      if (data) {
        const { tokenInfo, userInfo } = data;
        // token 过期时间24小时
        if (tokenInfo === undefined) {
          // message.error('该用户未关联此系统!')
          return;
        }

        for (const tokens of tokenInfo) {
          const expires = new Date(+new Date() + 24 * 60 * 60 * 1000);
          if (tokens.tokens.length !== 0) {
            // console.log('tokens.tokens[0]', tokens.tokens[0])
            CookieUtil.set('token', tokens.tokens[0].token, expires, '/');
          }
          const token_map = {};
          // console.log('tokens', tokens)
          for (const _token of tokens.tokens) {
            // token_map[_token.project_id] = _token.token;
            if (_token.project_id === PROJECT_ID) {
              CookieUtil.set('token_7', _token.token, expires, '/');
            } else {
              CookieUtil.set('token_' + _token.project_id, _token.token, expires, '/');
            }
          }

          // const tokenInformStr = tokens.tokens[0].token.split('.');
          // const tokenInform = JSON.parse(
          //   decodeURIComponent(
          //     escape(window.atob(tokenInformStr[1].replace(/-/g, '+').replace(/_/g, '/'))),
          //   ),
          // );
          // console.log('scopes', tokenInform.scopes);

          // CookieUtil.set(
          //   'tokenInform',
          //   JSON.stringify(tokenInform),
          //   new Date(+new Date() + 24 * 60 * 60 * 1000),
          // );
          // for (const key in tokenInform.scopes) {
          //   if (tokenInform.scopes[key] === 'Export') {
          //     CookieUtil.set('is_exportVisble', true);
          //   }
          // }
          // for (const key in tokenInform.scopes) {
          //   if (tokenInform.scopes[key] === 'UnlockSample') {
          //     CookieUtil.set('is_unlockVisible', true);
          //   }
          // }

          // yield put({
          //   type: 'add_tokens',
          //   payload: {
          //     [tokens.system_id]: token_map
          //   }
          // })
        }

        CookieUtil.set(
          'userInfo',
          JSON.stringify(userInfo),
          new Date(+new Date() + 24 * 60 * 60 * 1000),
        );
        // CookieUtil.set(
        //   'ALTER_can_export',
        //   JSON.stringify(ALTER_can_export),
        //   new Date(+new Date() + 24 * 60 * 60 * 1000)
        // )
        return true;
      }
      return false;
    },
  },
};

export default Model;
