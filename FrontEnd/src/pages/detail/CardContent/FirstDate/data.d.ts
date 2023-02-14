/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-07-03 01:03:22
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-07-06 21:08:30
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\FirstDate\data.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface FirstDateType {
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
  occupation_other?: string;
  isSubmit: number;
}
