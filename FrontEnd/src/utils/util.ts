/*
 * @Descripttion: 通用的工具类
 * @Author: linkenzone
 * @Date: 2020-09-06 22:14:37
 */

import moment from 'moment';
import React from 'react';
import { MultipleChoiceDataType } from '@/models/data';
import { FormInstance } from 'rc-field-form';
import { NamePath } from 'antd/lib/form/interface';

/**
 * @description: 去掉请求中的NULL元素
 * @param data: any
 * @return data: any
 */
export function removeNull(data: any) {
  if (Object.prototype.toString.call(data) !== '[object Object]') {
    throw new Error('request data is not a object.');
  }
  // 两层去掉null 和 空对象
  // for (const key in data) {
  //   if (data[key] === null || JSON.stringify(data[key]) === '{}') {
  //     delete data[key];
  //   } else if (Object.prototype.toString.call(data[key]) === '[object Object]') {
  //     for (const _key in data[key]) {
  //       if (data[key][_key] === null) {
  //         delete data[key][_key];
  //       }
  //     }
  //   }
  // }

  // 两层去掉 "" , [] 和 空对象
  // for (const key in data) {
  //   if (
  //     data[key] === '' ||
  //     JSON.stringify(data[key]) === '{}' ||
  //     JSON.stringify(data[key]) === '[]'
  //   ) {
  //     data[key] = null;
  //   } else if (Object.prototype.toString.call(data[key]) === '[object Object]') {
  //     for (const _key in data[key]) {
  //       if (
  //         data[key][_key] === '' ||
  //         JSON.stringify(data[key]) === '{}' ||
  //         JSON.stringify(data[key]) === '[]'
  //       ) {
  //         data[key][_key] = null;
  //       }
  //     }
  //   }
  // }
  return data;
}

/**
 * @description: 根据获得的生日返回年龄
 * @param birthday: any （传入moment类型即可)
 * @return number
 */
export function getAge(birthday: any) {
  const duration = moment.duration(moment().diff(birthday));
  return duration.years();
}

/**
 * @description: 根据身份证号码，返回生日
 * @param id_number: string
 * @return string
 */
export const getBirthDay = (id_number: string) => {
  const regIdCard = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  if (regIdCard.test(id_number)) {
    const year = id_number.slice(6, 10);
    const month = id_number.slice(10, 12);
    const day = id_number.slice(12, 14);
    return `${year}-${month}-${day}`;
    // const date = moment(`${year}-${month}-${day}`);
    // if (date.isValid()) {
    //   return `${year}-${month}-${day}`;
    // }
    // console.log('请输入正确的身份证号');
  }
  // console.log('身份证输入不合法');
  return '';
};

/**
 * @description: 处理多选框 get
 * @Param:
 */
export const getMultipleChoiceGet = ({
  multipleChoice,
  setOther,
}: {
  multipleChoice: MultipleChoiceDataType;
  setOther?: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // 如果 multipleChoice 不存在，直接返回
  if (!multipleChoice || !multipleChoice.radio) {
    if (setOther) {
      setOther(false);
    }
    return multipleChoice;
  }
  // 如果为字符串，将它转换
  if (typeof multipleChoice === 'string') multipleChoice = JSON.parse(multipleChoice);
  // console.log('multipleChoice', multipleChoice);
  if (!multipleChoice.other && multipleChoice.radio.indexOf('其他') < 0) {
    // if (multipleChoice.radio.indexOf('其他') < 0) {
    // console.log('multipleChoice2', multipleChoice);
    // 不存在其他
    if (setOther) {
      setOther(false);
    }
    return multipleChoice;
  }
  // 存在其他
  if (setOther) {
    setOther(true);
  }
  // list中push一个 其他
  if (multipleChoice.radio.indexOf('其他') < 0) {
    multipleChoice.radio.push('其他');
  }
  return multipleChoice;
};

/**
 * @description: 处理多选框 post
 * @Param:
 */
export const getMultipleChoicePost = ({
  multipleChoice,
  other,
}: {
  multipleChoice: MultipleChoiceDataType;
  other?: boolean;
}) => {
  if (!multipleChoice) return multipleChoice;
  if (!multipleChoice.radio || multipleChoice.radio.length === 0) {
    return null;
  }
  const result: string[] = [];
  if (!other) {
    if (!multipleChoice.radio) {
      // 不存在radio时，设置为[]
      multipleChoice.radio = result;
    }
    // 不存在其他
    multipleChoice.other = null;
    return multipleChoice;
  }
  // 存在其他 , 则删除多选中的其他
  if (multipleChoice.radio) {
    // eslint-disable-next-line guard-for-in
    for (const item of multipleChoice.radio) {
      if (item !== '其他') {
        result.push(item);
      }
    }
  }
  // 如果此时other为 null,undefined 设置为''
  if (multipleChoice.other === null || multipleChoice.other === undefined) {
    multipleChoice.other = '';
  }
  if (multipleChoice.radio.indexOf('其他') < 0) {
    multipleChoice.other = null;
  }
  multipleChoice.radio = result;
  return multipleChoice;
};

export const emptyRadioToNull = (values: MultipleChoiceDataType) => {
  if (!values || !values.radio || values.radio.length === 0) {
    return null;
  }
  if (values.radio.indexOf('其他') < 0) {
    delete values.other;
  }
  return values;
};

// export const radioSetOther = (
//   values: MultipleChoiceDataType,
//   setOther?: React.Dispatch<React.SetStateAction<boolean>>,
// ) => {
//   if (!setOther) return;
//   // if (values && values.radio && values.radio.indexOf('其他') >= 0) {
//   //   setOther(true);
//   // } else {
//   //   setOther(false);
//   // }
// };

/**
 * 判断Form字段值是否等于某个值
 * @param formInstance
 * @param name
 * @param target
 */
export const isFormValueEqual = (formInstance: FormInstance<any>, name: NamePath, target: any) => {
  const value = formInstance.getFieldValue(name);
  return value === target;
};

/**
 * 判断Form数组型字段值是否包含某个值
 * @param formInstance
 * @param name
 * @param target
 */
export const itemExist = (formInstance: FormInstance<any>, name: NamePath, target: string) => {
  const value = formInstance.getFieldValue(name);
  return value && value.indexOf(target) >= 0;
};

/**
 * 判断Form数组型字段值是否包含'其他'
 * @param formInstance
 * @param name
 */
export const otherExist = (formInstance: FormInstance<any>, name: NamePath) => {
  return itemExist(formInstance, name, '其他');
};

/**
 * 判断Form数组型字段值是否包含'其他'
 * @param formInstance
 * @param name
 */
export const someThingExist = (
  formInstance: FormInstance<any>,
  name: NamePath,
  something: string | number,
) => {
  return itemExist(formInstance, name, something);
};

/**
 * 脱敏处理
 * @param data
 * @param type
 * @returns
 */
export const handleAnonymous = (data: string | undefined, type?: string) => {
  if (data) {
    if (type === 'hospitalNumber' && data?.length > 1)
      return `${data.substring(0, 2)}****${data.substring(data.length - 2)}`;
    if (type === 'idNumber' && data?.length > 1)
      return `${data.substring(0, 4)}**********${data.substring(data.length - 4)}`;
    if (type === 'phoneNumber' && data?.length > 1)
      return `${data.substring(0, 3)}****${data.substring(data.length - 4)}`;
    if (type === 'patientName' && data?.length > 1) {
      const nameLength = data.length;
      if (nameLength <= 2) return `${data.substring(0, 1)}*`;
      if (nameLength === 3) return `${data.substring(0, 1)}*${data.substring(2, nameLength)}`;
      if (nameLength > 3 && nameLength <= 6)
        return `${data.substring(0, 1)}**${data.substring(3, nameLength)}`;
      if (nameLength > 6) return `${data.substring(0, 2)}****${data.substring(6, nameLength)}`;
    }
    return data;
  }
  return '';
};
interface ContextProps {
  pid?: number | undefined;
  treNum?: number | undefined;
  modalModule?: string | undefined;
  doubtStatus?: any;
  modalform?: any;
  is_locked?: any;
  moduleId?: number | undefined;
}

const context: ContextProps = {
  pid: undefined,
  treNum: undefined,
  modalModule: undefined,
  doubtStatus: {},
  modalform: undefined,
  is_locked: undefined,
  moduleId: undefined,
};

export const ModelContext = React.createContext(context);
/**
 * 得到表格中一条record总的监察状态
 * @param field
 * @param module_name
 * @param _treNum
 * @param id
 * @returns
 */
export const getRecordStatus = (field: any, module_name: string, _treNum: number, id: number) => {
  if (field && field[_treNum] && field[_treNum][module_name] && field[_treNum][module_name][id]) {
    const recordStatusObject = field[_treNum][module_name][id];
    const arr = [...new Set(Object.values(recordStatusObject))];
    arr.sort((a, b) => a - b);
    let recordStatus = 0;
    if (arr.length > 1) {
      const max = arr.pop();
      if (max !== 3) recordStatus = max;
      else recordStatus = arr.pop();
    } else {
      // eslint-disable-next-line prefer-destructuring
      recordStatus = arr[0];
    }
    return recordStatus;
  }
  return 0;
};
