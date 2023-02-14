/*
 * @Descripttion: 文件的请求
 * @Author: linkenzone
 * @Date: 2020-09-29 14:47:24
 */

import request from '@/utils/request';

/**
 * @description: 获取文件列表
 * @Param:
 */
export async function FetchFileList({
  id,
  pid,
  folder,
}: {
  id: number;
  pid: number;
  folder: string;
}) {
  return request(`/v1/file/${folder}/${pid}/${id}`, {
    method: 'GET',
  });
}
/**
 * @description: 删除文件
 * @Param:
 */
export async function DeleteFile({
  pid,
  id,
  folder,
  body,
}: {
  pid: number;
  id: number;
  folder: string;
  body: any;
}) {
  return request(`/v1/file/${folder}/${pid}/${id}`, {
    method: 'DELETE',
    data: body,
  });
}
