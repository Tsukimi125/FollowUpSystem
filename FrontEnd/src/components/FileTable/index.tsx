/*
 * @Descripttion: 文件上传下载的表格
 * @Author: linkenzone
 * @Date: 2020-09-14 16:39:32
 */

import React, { useEffect, useState } from 'react';
import type { Dispatch } from 'umi';
import { connect } from 'umi';
import { Modal, Table, Space, Upload, Button, message, Popconfirm, Tooltip } from 'antd';
import { FileOutlined, UploadOutlined } from '@ant-design/icons';
// import { post_prefix } from '@/utils/request';
import Cookies from 'js-cookie';
import type { StateType } from '@/models/file';
import type { FileInfoDataType } from './data';
import style from './style.less';

// type Breakpoint = 'xxl' | 'xl' | 'lg' | 'md' | 'sm' | 'xs';

interface FileTableProps {
  // visible: boolean;
  // closeHandler: () => void;
  buttonType?: 'text' | 'link' | 'ghost' | 'default' | 'primary' | 'dashed' | undefined;
  buttonStyle?: React.CSSProperties | undefined;
  buttonLabel?: string;
  id?: number;
  pid: number;
  folder: string;
  fileList: FileInfoDataType[];
  // OCRFileResult: any[];
  fileListLoading: boolean;
  dispatch: Dispatch;
}

const FileTable: React.FC<FileTableProps> = (props) => {
  const {
    buttonStyle,
    buttonType,
    buttonLabel,
    id,
    pid,
    folder,
    fileList,
    fileListLoading,
    // OCRFileResult,
    dispatch,
  } = props;

  const [visible, setVisible] = useState(false);
  const closeHandler = () => {
    setVisible(false);
  };

  const isAssetTypeAnImage = (file_name: string) => {
    const strRegex = '(.jpg|.png|.gif|.jpeg|.bmp|.webp|.svg|.tiff)$';
    const re = new RegExp(strRegex);
    if (re.test(file_name.toLowerCase())) {
      return true;
    }
    return false;
  };

  const DeleteHandler = (record: any) => {
    dispatch({
      type: 'file/deleteFile',
      payload: {
        pid,
        id,
        folder,
        body: { filename: record.file_name },
      },
    }).then(() =>
      dispatch({
        type: 'file/fetchFileList',
        payload: { id, pid, folder },
      }),
    );
  };

  const downloadFile = (record: any) => {
    // console.log('record', record);
    fetch(`${API_URL}/static/${folder}/${id}/${record.file_name}`, {
      method: 'GET',
      headers: {},
    })
      .then((response) => {
        response.arrayBuffer().then((buffer) => {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', record.file_name); // or any other extension
          document.body.appendChild(link);
          link.click();
          link.remove();
        });
      })
      .catch((err) => {
        // console.log(err);
      });
  };

  const columns = [
    {
      title: '文件名',
      dataIndex: 'file_name',
      key: 'file_name',
      // ellipsis: true,
      render: (text: any) => {
        return (
          <Tooltip placement="top" title={text}>
            <span className={style.custom_table_ellipsis}>{text}</span>
          </Tooltip>
        );
      },
    },
    {
      title: '创建时间',
      dataIndex: 'file_ctime',
      key: 'file_time',
      // responsive: ['sm'] as Breakpoint[],
    },
    {
      title: '文件大小',
      dataIndex: 'file_size',
      key: 'file_size',
      // responsive: ['sm'] as Breakpoint[],
    },
    {
      title: '操作',
      key: 'action',
      width: 120,
      render: (text: any, record: any) => {
        // console.log(record);
        return (
          <Space size="middle">
            {isAssetTypeAnImage(record.file_name) ? (
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={`${API_URL}/static/${folder}/${id}/${record.file_name}`}
              >
                查看
              </a>
            ) : (
              <a onClick={() => downloadFile(record)}>下载</a>
            )}
            <Popconfirm
              title="确认要删除这个文件?"
              onConfirm={() => DeleteHandler(record)}
              okText="是"
              cancelText="否"
            >
              <a href="#">删除</a>
            </Popconfirm>
            {/* <a
              onClick={() => {
                dispatch({
                  type: 'file/ocrFile',
                  payload: { id, pid, folder, body: { filename: record.file_name } },
                });
              }}
            >
              OCR
            </a> */}
          </Space>
        );
      },
    },
  ];

  useEffect(() => {
    // console.log('id', id);
    if (visible === true) {
      dispatch({
        type: 'file/fetchFileList',
        payload: { id, pid, folder },
      });
    }
  }, [visible]);

  const handleChange = (info: any) => {
    if (info.file.status !== 'uploading') {
      // console.log('正在上传');
      // console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      // const ocrRes = info.file.response.data;
      // console.log('OCR识别结果：', ocrRes);
      // TODO: 图片上传成功，但是无法识别文字怎么处理？
      /* if (info.file.response.data===null) {
        message.warning(`OCR识别失败！请检查报告类型是否对应或图片是否清晰！`)
      }
      else{
        message.success(`${info.file.name} 上传成功`);
      } */
      message.success(`${info.file.name} 上传成功`);
      dispatch({
        type: 'file/fetchFileList',
        payload: { id, pid, folder },
      });
      /* dispatch({
        type: 'laboratoryExam/fetchOcrResult',
        payload: { id, pid, folder, ocrRes },
      }); */
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const beforeUpload = (file: any) => {
    // const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    // if (!isJpgOrPng) {
    //   message.error('You can only upload JPG/PNG file!');
    // }
    // console.log('beforeUpload的文件数据', file);
    const isLt10M = file.size / 1024 / 1024 < 20;
    if (!isLt10M) {
      message.error('文件必须小于 20MB!');
    }
    return isLt10M;
  };

  const UploadProps = {
    name: 'file',
    action: `${API_URL}/v1/file/${folder}/${pid}/${id}`,
    data: {},
    // 这里的request的header不能加在extend创建实例里
    // customRequest:handleRequest,
    headers: {
      Authorization: `Bearer ${Cookies.get('token_5')}`,
      // "Content-Type":"multipart/form-data"
    },

    /* progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: number) => `${parseFloat(percent.toFixed(2))}%`,
    }, */
    beforeUpload,
    showUploadList: false,
    onChange: handleChange,
  };

  return (
    <>
      <Button
        onClick={() => {
          setVisible(true);
        }}
        type={buttonType}
        style={buttonStyle}
        disabled={!id}
      >
        <FileOutlined />
        {buttonLabel || '文件操作'}
      </Button>

      {!id ? (
        <span style={{ fontSize: 14, display: 'inline-block', marginLeft: 12, color: '#ff5b5b' }}>
          请先保存表单!
        </span>
      ) : null}

      <Modal
        title="文件列表"
        visible={visible}
        forceRender
        onCancel={closeHandler}
        centered
        footer={null}
        className={style.custom_modal_body}
      >
        <Table
          rowKey="file_name"
          loading={fileListLoading}
          tableLayout="fixed"
          bordered
          dataSource={fileList}
          columns={columns}
          pagination={false}
          title={() => (
            <>
              <Upload {...UploadProps}>
                <Button type="primary">
                  <UploadOutlined /> 点击上传
                </Button>
              </Upload>
            </>
          )}
          footer={() => (
            <>
              <p style={{ marginBottom: '8px' }}>* 上传文件名相同的文件会被覆盖</p>
              <p style={{ marginBottom: '0px' }}>* 文件大小限制（单个文件20M)</p>
            </>
          )}
        />
      </Modal>
    </>
  );
};

const mapStateToProps = ({
  file,
  loading,
}: {
  file: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  // console.log('file', file);
  return {
    fileList: file.fileInfoList,
    // OCRFileResult: file.OCRFileResult,
    fileListLoading: loading.effects['file/fetchFileList'],
  };
};

// const mapStateToProps = (state: any) => {
//   console.log('state', state);
//   return {};
// };

export default connect(mapStateToProps)(FileTable);
