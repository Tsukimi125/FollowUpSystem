/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-06 21:33:15
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\FirstDate\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// 修改访视日期
export async function ModifyFirstDate({ cycleId, body }: { cycleId: number; body: any }) {
  return request(`${GGTJ_API}/cycle/update?cycleId=${cycleId}`, {
    method: 'POST',
    data: body,
  });
}
