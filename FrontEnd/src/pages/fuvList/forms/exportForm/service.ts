/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 15:53:38
 */

import umi_request from 'umi-request';
// import { post_prefix } from '@/utils/request';
import Cookies from 'js-cookie';
import request from '@/utils/request';

/**
 * @description: 导出excel表
 * @Param:
 */
export async function ExportFuv({ body, data_mask }: { body: any; data_mask: number }) {
  const url = data_mask === 1 ? '/v1/export?data_mask=1' : '/v1/export';

  // 处理下载文件
  return (
    umi_request
      .post(url, {
        prefix: API_URL,
        // 加上responseType 不然会乱码
        responseType: 'arrayBuffer',
        getResponse: true,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token_5')}`,
        },
        data: body,
      })
      // eslint-disable-next-line func-names
      .then(function ({ data, response }) {
        const type = response.headers.get('Content-Type');
        // console.log('response', response);

        // console.log('type', type);
        if (type === 'text/csv; charset=utf-8') {
          // console.log('返回类型为:text/csv', data);
          return data;
        }

        // if (type === 'application/x-xlsx') {
        //   return data;
        // }

        if (type === 'application/json') {
          return { code: '1004', msg: '导出失败', description: 'POST /v1/export' };
        }
        return { code: '1005', msg: '返回类型错误', description: 'POST /v1/export' };
      })
      .catch((error) => {
        // console.log(error);
        return { code: '1004', msg: '导出失败', description: 'POST /v1/export' };
      })
  );
}

export async function FetchMaxTreIndex(payload: any) {
  // console.log('FetchMaxTreIndex body', payload);
  return request('/v1/record_info/max_treIndex', {
    method: 'POST',
    data: payload,
  });
}

// 获得导出最大样本数
export async function FetchMaxAmount(payload: any) {
  return request('/v1/treatment_info/follInfo/max_amount', {
    method: 'POST',
    data: payload,
  });
}
