import request from '@/utils/request';

// 修改入科第1天日期
export async function ModifyAdmissionPageDate({ cycleId, body }: { cycleId: number; body: any }) {
  return request(`${GGTJ_API}/cycle/update?cycleId=${cycleId}`, {
    method: 'POST',
    data: body,
  });
}
