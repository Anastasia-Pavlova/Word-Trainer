'use client';

import { Radio, Space, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completeStep } from '../../redux/reducers/stepsSlice';
import { setCurrentWord } from '../../redux/reducers/wordsSlice';
import { RootState } from '../../redux/store';

const { Title } = Typography;

export const SelectWords = ({ currentStep }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const words = useSelector((state: RootState) => state.words.list);

  function handleChangeValue(e) {
    setValue(e.target.value);
    dispatch(setCurrentWord(e.target.value));
    dispatch(completeStep({ step: currentStep, isCompleted: true }));
  }

  return (
    <Space direction="vertical">
      <Title level={4}>{t('choose_word')}</Title>

      <Radio.Group value={value} onChange={handleChangeValue}>
        <Space direction="vertical">
          {words.map((word) => (
            <Radio key={word.word} value={word.word}>
              <span
                style={{
                  color: word.isUsed
                    ? word.isCompleted
                      ? 'green'
                      : 'red'
                    : 'fff',
                }}
              >
                {word.word}
              </span>
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Space>
  );
};
