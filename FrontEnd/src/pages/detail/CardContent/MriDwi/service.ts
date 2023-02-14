import request from '@/utils/request';

// 获取MriDwi信息
export async function FetchMriDwi({ pid }: { pid: number }) {
  return request(`${GGTJ_API}/imagingTest/get?sampleId=${pid}`, {
    method: 'GET',
  });
}

// 修改MriDwi信息
export async function ModifyMriDwi({ pid, body }: { pid: number; body: any }) {
  return request(`${GGTJ_API}/imagingTest/update?sampleId=${pid}`, {
    method: 'POST',
    data: body,
  });
}
