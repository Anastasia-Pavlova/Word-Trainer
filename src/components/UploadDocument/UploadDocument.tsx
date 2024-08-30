'use client';

import { UploadOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography, Upload } from 'antd';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import data from '../../example.json';
import { completeStep } from '../../redux/reducers/stepsSlice';
import { addWords } from '../../redux/reducers/wordsSlice';

const { Text } = Typography;

export const UploadDocument = ({ currentStep }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleBeforeUpload(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result;

      if (typeof result === 'string') {
        try {
          const data = JSON.parse(result);
          dispatch(addWords(data));
          dispatch(completeStep(currentStep));
        } catch (error) {
          console.error('Error parsing JSON:', error);
        }
      } else {
        console.error('Unexpected result type:', typeof result);
      }
    };
    reader.readAsText(file);

    return false;
  }

  function handleUseSampleFile() {
    dispatch(addWords(data));
    dispatch(completeStep({ step: currentStep, isCompleted: true }));
  }

  return (
    <>
      <Upload accept=".json" showUploadList beforeUpload={handleBeforeUpload}>
        <Tooltip title={t('upload_tip')}>
          <Button type="primary" icon={<UploadOutlined />}>
            {t('upload')}
          </Button>
        </Tooltip>
      </Upload>
      <Text>{t('or')}</Text>
      <div>
        <Button onClick={handleUseSampleFile}>{t('use_sample_file')}</Button>
      </div>
    </>
  );
};
