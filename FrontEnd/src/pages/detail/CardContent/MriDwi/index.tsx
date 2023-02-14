import React, { useEffect, useState } from 'react';
import {
  Button,
  Form,
  Input,
  Radio,
  Spin,
  Col,
  Upload,
  message,
  notification,
  Row,
  Layout,
} from 'antd';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
// import { handleAnonymous } from '@/utils/util';
import moment from 'moment';
import type { StateType as GlobalStateType } from '@/models/global';
import type { StateType } from './model';
import type { MriDwiType } from './data';
import { useForm } from 'antd/es/form/Form';
import styles from './style.less';
import { UploadOutlined, StarOutlined, DownloadOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import type { StateType as BaseStateType } from '../BaseInfo/model';
import type { StateType as CycleStateType } from '@/models/cycle';
import { size } from 'lodash';
import type { UploadFile } from 'antd/es/upload/interface';
import Cookies from 'js-cookie';
// import request, { extend } from 'umi-request';
import { FetchFile } from '@/utils/requestFile';
import request from '@/utils/request';
import Sider from 'antd/lib/layout/Sider';
import { Content } from 'antd/lib/layout/layout';

interface MriDwiProps {
  dispatch: Dispatch;
  mriDwi?: MriDwiType;
  mriDwiLoading: boolean;
  useAnonymousGlobal: boolean;
  pid: number;
  // cycleId: number;
  isSubmit: boolean;
}

const MriDwi: React.FC<MriDwiProps> = (props) => {
  const { mriDwi, mriDwiLoading, pid, isSubmit, dispatch } = props;
  const actionuploadpdf = `${GGTJ_API}/imagingTest/uploadPdf?sampleId=${pid}`;
  const actionuploadpng = `${GGTJ_API}/imagingTest/uploadImg?sampleId=${pid}`;

  const header = {
    // 'Content-Type': 'multipart/form-data',
    Authorization: `Bearer ${Cookies.get('token_7')}`,
  };

  const [form] = useForm();
  const [is_continue, setIs_continue] = useState<boolean | null>(null);
  const formItemLayout = {
    labelCol: { xl: { span: 2 }, md: { span: 2 } },
    wrapperCol: { xl: { span: 18 }, md: { span: 18 } },
  };

  const [PDFFile, setPDFFile] = useState(false);
  const [imgFile, setImgFile] = useState(false);

  useEffect(() => {
    dispatch({
      type: 'mriDwi/fetchMriDwi',
      payload: { pid },
    });
  }, []);

  useEffect(() => {
    form.setFieldsValue(mriDwi);
    if (mriDwi?.isExist === 1) {
      setIs_continue(true);
    }
    if (mriDwi?.pdfPath) {
      setPDFFile(true);
    }
    if (mriDwi?.imgPath) {
      setImgFile(true);
    }
  }, [mriDwi]);

  const handleSubmit = (values: any) => {
    // console.log('value :', values);
    dispatch({
      type: 'mriDwi/modifyMriDwi',
      payload: { pid, body: values },
    });
  };

  const uploadpdf: UploadProps = {
    beforeUpload: (file) => {
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const extension = testmsg === 'pdf' || testmsg === 'PDF';
      if (!extension) {
        message.error(`${file.name} 不是PDF文件`);
      }

      return extension || Upload.LIST_IGNORE;
      // console.log(file);
    },

    onChange({ file, fileList }) {
      if (file.response !== undefined) {
        if (file.response.status === 200) {
          message.success('上传成功！');
          form.submit();
        } else {
          message.error('上传失败');
          if (file.response.message) {
            notification.error({
              message: file.response.message,
            });
          }
        }
      }
    },
    showUploadList: false,
    maxCount: 1,
    action: actionuploadpdf,
    headers: header,
  };

  const uploadpng: UploadProps = {
    onChange({ file, fileList }) {
      if (file.response !== undefined) {
        if (file.response.status === 200) {
          message.success('上传成功！');
          form.submit();
        } else {
          message.error('上传失败');
          if (file.response.message) {
            notification.error({
              message: file.response.message,
            });
          }
        }
      }
    },
    showUploadList: false,
    maxCount: 1,
    action: actionuploadpng,
    headers: header,
  };

  const downloadPDF = () => {
    const option = {
      method: 'GET',
      dataType: 'blob',
      url: `${GGTJ_API}/imagingTest/downloadPdf?sampleId=${pid}`,
      fileName: '影像学检查文件.pdf',
    };
    FetchFile(option);
  };

  const downloadImg = () => {
    const option = {
      method: 'GET',
      dataType: 'blob',
      url: `${GGTJ_API}/imagingTest/downloadImg?sampleId=${pid}`,
      fileName: '影像学检查图像文件.jpg',
    };
    FetchFile(option);
  };

  // console.log('mriDwi', mriDwi);

  return (
    <Spin spinning={mriDwiLoading}>
      <Form
        form={form}
        {...formItemLayout}
        labelAlign="left"
        onFinish={handleSubmit}
        // disabled={isSubmit}
      >
        <Form.Item
          label="是否进行MRI+DWI影像学检查"
          name="isExist"
          labelCol={{ xl: { span: 5 }, md: { span: 5 } }}
        >
          <Radio.Group onChange={(e) => setIs_continue(e.target.value)} disabled={isSubmit}>
            <Radio value={1}>是</Radio>
            <Radio value={0} style={{ marginLeft: 10 }}>
              否
            </Radio>
          </Radio.Group>
        </Form.Item>

        {is_continue ? (
          <>
            <Form.Item label="影像号" name="imagingNum">
              <Input className={styles.form_input} disabled={isSubmit} />
            </Form.Item>
            <Form.Item label="报告" name="reportContent">
              <Input.TextArea style={{ height: 200 }} disabled={isSubmit} />
            </Form.Item>
            {/* <Form.Item label="上传文件"> */}
            <span style={{ verticalAlign: 'top' }}>上传文件 :</span>
            <div style={{ display: 'inline-block', marginLeft: 30, marginBottom: 30 }}>
              <Upload {...uploadpdf}>
                <Button icon={<UploadOutlined />} type="primary" ghost disabled={isSubmit}>
                  PDF文件上传
                </Button>
              </Upload>
              {PDFFile ? (
                <div style={{ marginTop: 10, marginBottom: 30 }}>
                  <span>
                    已上传：
                    <span style={{ fontWeight: 'bold', color: 'red' }}>影像学检查PDF文件</span>
                  </span>
                  <Button
                    onClick={() => downloadPDF()}
                    size="small"
                    type="primary"
                    ghost
                    icon={<DownloadOutlined />}
                    style={{ marginLeft: 20 }}
                  >
                    下载
                  </Button>
                </div>
              ) : (
                <div style={{ marginTop: 20 }} />
              )}
              <Upload {...uploadpng}>
                <Button icon={<UploadOutlined />} type="primary" ghost disabled={isSubmit}>
                  图像上传
                </Button>
              </Upload>
              {imgFile ? (
                <div style={{ marginTop: 10, marginBottom: 30 }}>
                  <span>
                    已上传：
                    <span style={{ fontWeight: 'bold', color: 'red' }}>影像学检查图像文件</span>
                  </span>
                  <Button
                    onClick={() => downloadImg()}
                    size="small"
                    type="primary"
                    ghost
                    icon={<DownloadOutlined />}
                    style={{ marginLeft: 20 }}
                  >
                    下载
                  </Button>
                </div>
              ) : null}
            </div>
            {/* </Form.Item> */}
          </>
        ) : null}
        <Col offset={3}>
          <Button htmlType="submit" type="primary" disabled={isSubmit}>
            保存
          </Button>
        </Col>
      </Form>
    </Spin>
  );
};

const mapStateToProps = ({
  mriDwi,
  loading,
  global,
  base,
}: // cycle,
{
  mriDwi: StateType;
  global: GlobalStateType;
  loading: { effects: { [key: string]: boolean } };
  base: BaseStateType;
  // cycle: CycleStateType;
}) => {
  return {
    useAnonymousGlobal: global.useAnonymousGlobal,
    mriDwi: mriDwi.mriDwi,
    mriDwiLoading: loading.effects['mriDwi/fetchMriDwi'],
    isSubmit: !!base.baseInfo?.isSubmit,
  };
};

export default connect(mapStateToProps)(MriDwi);
