/*
 * @Descripttion: Do not edit
 * @Author: linkenzone
 * @Date: 2021-01-29 15:39:21
 */
import React, { useEffect, useState } from 'react';
import { Steps } from 'antd';
import { Dispatch, connect } from 'umi';
import 'ant-design-draggable-modal/dist/index.css';
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal';
import { StateType } from './model';
import Step1 from './step1';
import Step2 from './step2';
import Step3 from './step3';
import Step4 from './step4';
import Step5 from './step5';

const { Step } = Steps;

interface ExportFormProps {
  current: StateType['current'];
  steps: number[];
  modalVisible: boolean;
  exportLoading: boolean;
  useAnonymous: boolean;
  dispatch: Dispatch;
  onModalClose: () => void;
}

const ExportForm: React.FC<ExportFormProps> = (props) => {
  const {
    modalVisible,
    onModalClose,
    current,
    steps,
    exportLoading,
    useAnonymous,
    dispatch,
  } = props;

  const [stepComponent, setStepComponent] = useState<React.ReactNode>(
    <Step1 useAnonymous={useAnonymous} />,
  );
  const [currentStep, setCurrentStep] = useState<number>(0);

  const modalRef: any = React.useRef();

  const getCurrentStepAndComponent = (cur?: number) => {
    switch (cur) {
      case 1:
        return { step: 1, component: <Step2 /> };
      case 2:
        return { step: 2, component: <Step3 /> };
      case 3:
        return { step: 3, component: <Step4 /> };
      case 4:
        return { step: 4, component: <Step5 /> };
      case 0:
      default:
        return { step: 0, component: <Step1 useAnonymous={useAnonymous} /> };
    }
  };

  useEffect(() => {
    // console.log('当前current:', current);
    const { step, component } = getCurrentStepAndComponent(current);
    setCurrentStep(step);
    setStepComponent(component);
  }, [current]);

  useEffect(() => {
    // 打开窗口的时候重置状态
    if (modalVisible === true) {
      // dispatch({
      //   type: 'exportData/save',
      //   payload: { current: 0 },
      // });

      // 清空数据
      dispatch({
        type: 'exportData/clear',
      });
      const { step, component } = getCurrentStepAndComponent(0);
      setCurrentStep(step);
      setStepComponent(component);
    }
  }, [modalVisible]);

  useEffect(() => {
    // console.log('exportLoading', exportLoading);
  }, [exportLoading]);

  return (
    <DraggableModalProvider>
      <div
        ref={modalRef}
        id="exportModalBody"
        onMouseEnter={(e) => {
          e.preventDefault();
          // console.log('onMouseEnter,禁止页面滚动');
          document.body.style.overflow = 'hidden';
          document.body.style.width = 'calc(100% - 17px)';
        }}
        onMouseLeave={(e) => {
          e.preventDefault();
          // console.log('onMouseLeave,开启页面滚动');
          document.body.removeAttribute('style');
        }}
      >
        <DraggableModal
          title="导出"
          visible={modalVisible}
          okButtonProps={{ style: { display: 'none' } }}
          onCancel={() => {
            // console.log('exportForm 关闭窗口');
            onModalClose();
          }}
          // confirmLoading={exportLoading}
          initialWidth={1000}
          initialHeight={720}
          zIndex={999}
          forceRender
          maskClosable={false}
          mask={false}
          getContainer={false}
        >
          <Steps current={currentStep} style={{ marginBottom: 24, marginTop: 12 }}>
            <Step title="病例选择" />
            <Step title="基线资料字段" />
            <Step title="治疗信息字段" />
            <Step title="随访信息字段" />
            <Step title="导出" />
          </Steps>
          {stepComponent}
        </DraggableModal>
      </div>
    </DraggableModalProvider>
  );
};

const mapStateToProps = ({
  exportData,
  loading,
}: {
  exportData: StateType;
  loading: { effects: { [key: string]: boolean } };
}) => {
  return {
    steps: exportData.steps,
    current: exportData.current,
    exportLoading: loading.effects['exportData/submitStepForm'],
  };
};

export default connect(mapStateToProps)(ExportForm);
