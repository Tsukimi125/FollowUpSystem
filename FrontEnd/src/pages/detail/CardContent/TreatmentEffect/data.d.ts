/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:19:16
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-13 18:01:04
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\TreatmentEffect\data.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface TreatmentEffectType {
  shock?: string | null;
  anoxiaTime?: string | null;
  oxygenUptake?: string | null;
  useInvasiveVentilator?: string | null;
  useNonInvasiveVentilator?: string | null;
  sedative?: string | null;
  analgesic?: string | null;
  delirium?: string | null;
  antibacterialDrug?: string | null;
  neuroprotectiveAgent?: string | null;
  corticosteroidInIcu72?: string | null;
  vasoactiveDrug?: string | null;
  treatmentOutcome?: number | null;
}

export interface drugType {
  isExist?: number;
  drugName?: string;
  dosage?: number;
  time?: number;
}

export interface oxygenType {
  isExist?: number;
  flow?: string;
  method?: string;
}
