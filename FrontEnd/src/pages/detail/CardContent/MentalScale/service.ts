/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: wzz 960867371@qq.com
 * @LastEditTime: 2022-07-11 22:18:30
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\MentalScale\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// // 获取病人信息
// export async function FetchMentalScale({ pid }: { pid: number }) {
//   return request(`/${GGTJ_API}/sample/get?sampleId=${pid}`, {
//     method: 'GET',
//   });
// }

// 修改病人信息
export async function ModifyMentalScale({ cycleId, body }: { cycleId: number; body: any }) {
  return request(`${GGTJ_API}/cycle/psychiatricRatingScale/update?cycleId=${cycleId}`, {
    method: 'POST',
    data: body,
  });
}
