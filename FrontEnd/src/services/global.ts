import request from '@/utils/request';

//获取cycleId
export async function FetchCycleList({ pid }: { pid: number }) {
  return request(`${GGTJ_API}/cycle/list?sampleId=${pid}`, {
    method: 'GET',
  });
}

//获取访视信息
export async function FetchCycleInfo({ cycleId }: { cycleId: number }) {
  return request(`${GGTJ_API}/cycle/get?cycleId=${cycleId}`, {
    method: 'GET',
  });
}

//获取研究中心
export async function FetchResearchCentersList({ body }: { body: any }) {
  return request(`${API_AUTH_URL}/v1/research_centers`, {
    method: 'GET',
    params: body,
  });
}

//获取用户的权限
export async function FetchUserAuths({ body }: { body: any }) {
  return request(`${API_AUTH_URL}/v1/user/auths`, {
    method: 'GET',
    params: body,
  });
}
