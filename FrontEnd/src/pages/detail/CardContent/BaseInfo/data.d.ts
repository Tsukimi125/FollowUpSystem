/*
 * @Author: wzz 960867371@qq.com
 * @Date: 2022-09-14 15:09:28
 * @LastEditors: wzz 960867371@qq.com
 * @LastEditTime: 2022-09-18 14:52:59
 * @FilePath: \ggtj-frontend-3\src\pages\detail\CardContent\BaseInfo\data.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface BaseInfoType {
  hospital: string;
  hospitalNumber: string;
  admissionDate: string;
  phone: string;
  name: string;
  sex: string;
  age: number;
  height: number;
  weight: number;
  bmi: number;
  maritalStatus: string;
  education: string;
  occupation: string;
  id: number;
  // occupation_other?: string;
  // is_submit: number;
  isSubmit: number;
  isDischarge: number;
}
