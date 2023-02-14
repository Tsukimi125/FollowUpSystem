import request from '@/utils/request';

//获取病人信息
export async function FetchSampleFilter({ pid }: { pid: number }) {
  return request(`${GGTJ_API}/sampleFilter/get?sampleId=${pid}`, {
    method: 'GET',
  });
}

//修改病人信息
export async function ModifySampleFilter({ pid, body }: { pid: number; body: any }) {
  return request(`${GGTJ_API}/sampleFilter/update?sampleId=${pid}`, {
    method: 'POST',
    data: body,
  });
}
