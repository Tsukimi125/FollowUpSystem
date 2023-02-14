// /*
//  * @Descripttion: 导出的弹窗
//  * @Author: linkenzone
//  * @Date: 2021-01-21 18:30:10
//  * 已弃用
//  */

// import React, { useEffect, useState } from 'react';

// import {
//   Button,
//   Checkbox,
//   Collapse,
//   Divider,
//   Form,
//   Input,
//   InputNumber,
//   Modal,
//   Radio,
//   Select,
//   Switch,
// } from 'antd';

// import { Dispatch, connect } from 'umi';

// import { FormInstance } from 'antd/lib/form';

// import 'ant-design-draggable-modal/dist/index.css';
// import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';

// import { exportDataList } from './exportData';

// const { Panel } = Collapse;
// const { Option, OptGroup } = Select;

// const ModalFormItemLayout = {
//   labelCol: { xl: { span: 8 }, md: { span: 10 } },
//   wrapperCol: { xl: { span: 16 }, md: { span: 14 } },
// };

// const SelectFormItem: React.FC<{
//   label: string;
//   name: string;
//   formIns: FormInstance;
//   options: any;
// }> = (props) => {
//   const { label, name, formIns, options } = props;

//   useEffect(() => {
//     // 默认全选
//     const all_list: string[] = [];
//     for (const item of options) {
//       all_list.push(item.value);
//     }
//     formIns.setFieldsValue({ [name]: all_list });
//   }, []);

//   return (
//     <Form.Item label={label} name={name}>
//       <Select
//         mode="multiple"
//         placeholder="请选择需要导出的数据"
//         options={options}
//         // maxTagCount="responsive"
//         allowClear
//         dropdownRender={(menu) => (
//           <div>
//             {menu}
//             <Divider style={{ margin: '4px 0' }} />
//             <Button
//               type="link"
//               style={{ width: '100%' }}
//               onClick={() => {
//                 const all_list: string[] = [];
//                 for (const item of options) {
//                   all_list.push(item.value);
//                 }
//                 formIns.setFieldsValue({ [name]: all_list });
//               }}
//             >
//               全选
//             </Button>
//           </div>
//         )}
//       />
//     </Form.Item>
//   );
// };

// interface ExportFormProps {
//   modalVisible: boolean;
//   dispatch: Dispatch;
//   onModalClose: () => void;
//   setIsExportAll: any;
//   isExportAll: boolean;
//   pids: number[];
//   all_pids: number[];
// }

// const ExportForm: React.FC<ExportFormProps> = (props) => {
//   const {
//     modalVisible,
//     onModalClose,
//     pids,
//     all_pids,
//     dispatch,
//     setIsExportAll,
//     isExportAll,
//   } = props;
//   const [exportModalForm] = Form.useForm();

//   // 是否导出全部
//   // const [isExportAll, setIsExportAll] = useState(false);
//   // 已经选择的表单
//   const [selectedForm, setSelectedForm] = useState<string[]>(['Patient']);

//   // 仅在组件渲染的时候调用一次 userAuths
//   useEffect(() => {
//     if (modalVisible === true) {
//       console.log('打开窗口');
//       // setInfo(pids.map((pid) => ({ pid, treNum: [0] })));
//     }
//   }, [pids, modalVisible]);

//   const onModalFinish = (values: any) => {
//     values.pids = isExportAll ? all_pids : pids;

//     console.log('values', values);

//     dispatch({
//       type: 'fuvList/exportFuv',
//       payload: { body: values },
//     });
//   };

//   return (
//     <DraggableModalProvider>
//       <DraggableModal
//         title="导出"
//         visible={modalVisible}
//         okButtonProps={{ disabled: !isExportAll && pids.length === 0 }}
//         onOk={() => {
//           exportModalForm.submit();
//         }}
//         onCancel={() => {
//           onModalClose();
//         }}
//         // confirmLoading={confirmLoading}
//         initialWidth={1000}
//         forceRender
//         maskClosable={false}
//         mask={false}
//       >
//         <Form
//           onFinish={onModalFinish}
//           form={exportModalForm}
//           {...ModalFormItemLayout}
//           labelAlign="left"
//         >
//           <Form.Item label="导出全部病例">
//             <Switch
//               checked={isExportAll}
//               onChange={(e) => {
//                 setIsExportAll(e);
//               }}
//             />
//           </Form.Item>

//           <Form.Item label="当前选择的病例数">
//             <span>{isExportAll ? all_pids.length : pids.length}</span>
//           </Form.Item>

//           <Form.Item label="导出治疗记录">
//             <Input.Group compact>
//               <Form.Item name="minTreNum" noStyle>
//                 <InputNumber
//                   min={0}
//                   max={999}
//                   className="site-input-left"
//                   style={{ width: 100, textAlign: 'center' }}
//                   placeholder="最小"
//                   precision={0}
//                 />
//               </Form.Item>
//               <Input
//                 className="site-input-split"
//                 style={{
//                   width: 30,
//                   borderLeft: 0,
//                   borderRight: 0,
//                   pointerEvents: 'none',
//                   marginLeft: '1px',
//                 }}
//                 placeholder="~"
//                 disabled
//               />
//               <Form.Item name="maxTreNum" noStyle>
//                 <InputNumber
//                   className="site-input-right"
//                   style={{ width: 100, textAlign: 'center' }}
//                   placeholder="最大"
//                   precision={0}
//                   min={0}
//                   max={999}
//                   onChange={(e) => {
//                     const minTreNum = exportModalForm.getFieldValue('minTreNum');
//                     if (typeof e === 'number')
//                       if (e < minTreNum) exportModalForm.setFieldsValue({ maxTreNum: minTreNum });
//                   }}
//                 />
//               </Form.Item>
//             </Input.Group>
//           </Form.Item>

//           <Form.Item label="需要导出的内容">
//             <Select
//               mode="multiple"
//               maxTagCount="responsive"
//               placeholder="请选择需要导出的内容"
//               value={selectedForm}
//               onChange={(e) => {
//                 setSelectedForm(e);
//               }}
//               // options={exportDataList.map((item) => ({ label: item.label, value: item.name }))}
//               allowClear
//               dropdownRender={(menu) => (
//                 <div>
//                   {menu}
//                   <Divider style={{ margin: '4px 0' }} />
//                   <Button
//                     type="link"
//                     style={{ width: '100%' }}
//                     onClick={() => {
//                       const all_list: string[] = [];
//                       let exportDataList_full = exportDataList.normal;
//                       exportDataList_full = exportDataList_full.concat(exportDataList.labExam);
//                       exportDataList_full = exportDataList_full.concat(exportDataList.otherExam);
//                       exportDataList_full = exportDataList_full.concat(exportDataList.treRecord);
//                       for (const item of exportDataList_full) {
//                         all_list.push(item.name);
//                       }
//                       setSelectedForm(all_list);
//                     }}
//                   >
//                     全选
//                   </Button>
//                 </div>
//               )}
//             >
//               <OptGroup label="基线资料">
//                 <Option value="Patient">基本信息(Patient)</Option>
//                 <Option value="PastHis">既往史(PastHis)</Option>
//                 <Option value="IniDiaPro">初诊过程(IniDiaPro)</Option>
//                 <Option value="Immunohis">免疫组化(Immunohis)</Option>
//                 <Option value="MoleDetec">分子检测(MoleDetec)</Option>
//               </OptGroup>
//               <OptGroup label="实验室检查">
//                 <Option value="BloodRoutine">血常规(BloodRoutine)</Option>
//                 <Option value="BloodBio">血生化(BloodBio)</Option>
//                 <Option value="Thyroid">甲状腺功能(Thyroid)</Option>
//                 <Option value="Coagulation">凝血功能(Coagulation)</Option>
//                 <Option value="MyocardialEnzyme">心肌酶谱(MyocardialEnzyme)</Option>
//                 <Option value="Cytokines">细胞因子(Cytokines)</Option>
//                 <Option value="LymSubsets">淋巴细胞亚群(LymSubsets)</Option>
//                 <Option value="UrineRoutine">尿常规(UrineRoutine)</Option>
//                 <Option value="TumorMarker">肿瘤标志物(TumorMarker)</Option>
//               </OptGroup>
//               <OptGroup label="其他检查">
//                 <Option value="Lung">肺功能(Lung)</Option>
//                 <Option value="OtherExams">其他检查(OtherExams)</Option>
//                 <Option value="ImageExams">影像学检查(ImageExams)</Option>
//               </OptGroup>
//               <OptGroup label="治疗记录">
//                 <Option value="TreRec">治疗记录(TreRec)</Option>
//                 <Option value="OneToFive">1线到5线的治疗方案(OneToFive)</Option>
//                 <Option value="Surgery">手术治疗(Surgery)</Option>
//                 <Option value="Radiotherapy">放疗(Radiotherapy)</Option>
//                 <Option value="DetailTrePlan">详细治疗药物(DetailTrePlan)</Option>
//                 <Option value="Signs">症状体征(Signs)</Option>
//                 <Option value="SideEffect">副反应(SideEffect)</Option>
//               </OptGroup>
//             </Select>
//           </Form.Item>

//           <Divider orientation="left">详细字段</Divider>

//           <Collapse defaultActiveKey={[]}>
//             <Panel header="基线资料" key={1} forceRender>
//               {exportDataList.normal.map((exportDataItem) => {
//                 if (selectedForm.indexOf(exportDataItem.name) !== -1) {
//                   return (
//                     <SelectFormItem
//                       label={exportDataItem.label}
//                       name={exportDataItem.name}
//                       formIns={exportModalForm}
//                       options={exportDataItem.options}
//                       key={exportDataItem.name}
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </Panel>
//             <Panel header="实验室检查" key={2} forceRender>
//               {exportDataList.labExam.map((exportDataItem) => {
//                 if (selectedForm.indexOf(exportDataItem.name) !== -1) {
//                   return (
//                     <SelectFormItem
//                       label={exportDataItem.label}
//                       name={exportDataItem.name}
//                       formIns={exportModalForm}
//                       options={exportDataItem.options}
//                       key={exportDataItem.name}
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </Panel>
//             <Panel header="其他检查" key={3} forceRender>
//               {exportDataList.otherExam.map((exportDataItem) => {
//                 if (selectedForm.indexOf(exportDataItem.name) !== -1) {
//                   return (
//                     <SelectFormItem
//                       label={exportDataItem.label}
//                       name={exportDataItem.name}
//                       formIns={exportModalForm}
//                       options={exportDataItem.options}
//                       key={exportDataItem.name}
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </Panel>
//             <Panel header="治疗记录" key={4} forceRender>
//               {exportDataList.treRecord.map((exportDataItem) => {
//                 if (selectedForm.indexOf(exportDataItem.name) !== -1) {
//                   return (
//                     <SelectFormItem
//                       label={exportDataItem.label}
//                       name={exportDataItem.name}
//                       formIns={exportModalForm}
//                       options={exportDataItem.options}
//                       key={exportDataItem.name}
//                     />
//                   );
//                 }
//                 return null;
//               })}
//             </Panel>
//           </Collapse>
//         </Form>
//       </DraggableModal>
//     </DraggableModalProvider>
//   );
// };

// const mapStateToProps = ({ loading }: { loading: { effects: { [key: string]: boolean } } }) => {
//   return {};
// };

// export default connect(mapStateToProps)(ExportForm);
