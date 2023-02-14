/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:22:26
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-11 10:17:06
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\DiseaseRelatedScale\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// // 获取病情评分信息
// export async function FetchDiseaseRelatedScale({ pid }: { pid: number }) {
//   return request(`/${GGTJ_API}/${pid}/conditionScore/get`, {
//     method: 'GET',
//   });
// }

// 修改病情评分信息
export async function ModifyDiseaseRelatedScale({ cycleId, body }: { cycleId: number; body: any }) {
  return request(`${GGTJ_API}/cycle/conditionScore/update?cycleId=${cycleId}`, {
    method: 'POST',
    data: body,
  });
}
