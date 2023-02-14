import request from '@/utils/request';

//获取病人信息
export async function FetchBaseInfo({ pid }: { pid: number }) {
  return request(`${GGTJ_API}/sample/get?sampleId=${pid}`, {
    method: 'GET',
  });
}

//修改病人信息
export async function ModifyBaseInfo({ pid, body }: { pid: number; body: any }) {
  return request(`${GGTJ_API}/sample/update?sampleId=${pid}`, {
    method: 'POST',
    data: body,
  });
}
