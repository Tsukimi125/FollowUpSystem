/*
 * @Author: 947656035 947656035@qq.com
 * @Date: 2022-07-05 22:14:28
 * @LastEditors: 947656035 947656035@qq.com
 * @LastEditTime: 2022-07-06 12:02:47
 * @FilePath: \ggtj-frontend\src\pages\detail\CardContent\LabInspection\table\index.tsx
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, { useState } from 'react';
import { Button, Form, Input, InputNumber, Radio, Spin, Upload } from 'antd';
import { RedoOutlined } from '@ant-design/icons';
import style from './table.less';

const { TextArea } = Input;

const InfoTable = (props) => {
  const { title, para } = props;

  const [form] = Form.useForm();
  return (
    <div>
      <table
        style={{
          width: '100%',
          height: '100%',
          textAlign: 'center',
          marginTop: '20px',
          border: '1px solid #dfe6e9',
        }}
      >
        <tbody>
          <tr style={{ height: '47px', backgroundColor: '#BCE7F2' }}>
            <th style={{ width: '12.5%' }} className={style.tHead}>
              代码
            </th>
            <th style={{ width: '16.6%' }} className={style.tHead}>
              项目
            </th>
            <th style={{ width: '16.6%' }} className={style.tHead}>
              测定值
            </th>

            <th style={{ width: '8.3%' }} className={style.tHead}>
              单位
            </th>

            <th style={{ width: '25%' }} className={style.tHead}>
              临床意义判断
            </th>
            <th style={{ width: '20%' }} className={style.tHead}>
              备注
            </th>
          </tr>
        </tbody>
      </table>
      <Form form={form}>
        {Object.keys(para).map((key) => {
          return (
            <table className={style.row} key={key}>
              <tbody>
                <tr style={{ minHeight: '3rem' }}>
                  <td style={{ width: '12.5%' }} className={style.grid}>
                    {key}
                  </td>
                  <td style={{ width: '16.6%' }} className={style.grid}>
                    {para[key].name}
                  </td>
                  <td
                    style={{ width: '16.6%', textAlign: 'center', height: '100%' }}
                    className={style.grid}
                  >
                    <Form.Item name={`${para[key].key}`}>
                      {title === '尿常规' ? (
                        <Input style={{ width: '96%' }} autoComplete="off" />
                      ) : (
                        <InputNumber style={{ width: '96%' }} autoComplete="off" />
                      )}
                    </Form.Item>
                  </td>
                  {title === '尿常规' ? null : (
                    <td style={{ width: '8.3%' }} className={style.grid}>
                      {para[key].unit}
                    </td>
                  )}
                  <td style={{ width: '25%' }} className={style.grid}>
                    <Form.Item name={`${key}ClinicalJudgment`}>
                      <Radio.Group>
                        <Radio value={0}>正常</Radio>
                        <Radio value={1}>异常</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </td>
                  <td style={{ width: '20%' }} className={style.grid}>
                    <Form.Item name={`${para[key].key}Note`}>
                      <TextArea style={{ width: '96%' }} />
                    </Form.Item>
                  </td>
                </tr>
              </tbody>
            </table>
          );
        })}
      </Form>
    </div>
  );
};

export default InfoTable;
