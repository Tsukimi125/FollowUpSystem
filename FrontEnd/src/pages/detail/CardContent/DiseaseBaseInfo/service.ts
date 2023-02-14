import request from '@/utils/request';

//获取病人信息
export async function FetchDiseaseBaseInfo({ pid }: { pid: number }) {
  return request(`${GGTJ_API}/diseaseBaseInfo/get?sampleId=${pid}`, {
    method: 'GET',
  });
}

//修改病人信息
export async function ModifyDiseaseBaseInfo({ pid, body }: { pid: number; body: any }) {
  return request(`${GGTJ_API}/diseaseBaseInfo/update?sampleId=${pid}`, {
    method: 'POST',
    data: body,
  });
}
