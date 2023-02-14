/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-04 23:22:26
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-28 19:55:03
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\LabInspection\service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import request from '@/utils/request';
// import request from 'umi-request';
// 获取实验室检查信息
export async function FetchLabInspectionInfo({ labTest }: { labTest: number }) {
  return request(`${GGTJ_API}/labTest/get?labTestId=${labTest}`, {
    method: 'GET',
  });
}

export async function ModifyInflammationIndicatorsInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/inflammationIndicators/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyBloodTestInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/bloodTest/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}
export async function ModifyBloodBiochemistryInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/bloodBiochemistry/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}
export async function ModifyCoagulationFunctionInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/coagulationFunction/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}
export async function ModifyArterialBloodGasInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/arterialBloodGas/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifySpecialInspectionInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/specialInspection/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyMicrobiomeInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/microbiome/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyRheumatism14Info({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/rheumatism14/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyLymphocyteSubsetsInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/lymphocyteSubsets/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyCellFactorInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/cellFactor/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyImmuneInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/immune/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyGmTestInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/gmTest/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyTuberculosisInfectionTCellTestInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/tuberculosisInfectionTCellTest/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifyMolecularInfo({ labTest, body }: { labTest: number; body: any }) {
  return request(`${GGTJ_API}/labTest/molecular/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}

export async function ModifySciResearchProjectInfo({
  labTest,
  body,
}: {
  labTest: number;
  body: any;
}) {
  return request(`${GGTJ_API}/labTest/sciResearchProject/update?labTestId=${labTest}`, {
    method: 'POST',
    data: body,
  });
}
