/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-09 17:10:43
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-12 09:30:18
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\TreatmentEffect\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';

// 修改治疗效果信息
export async function ModifyTreatmentInfo({ cycleId, body }: { cycleId: number; body: any }) {
  return request(`${GGTJ_API}/cycle/treatmentEffect/update?cycleId=${cycleId}`, {
    method: 'POST',
    data: body,
  });
}
