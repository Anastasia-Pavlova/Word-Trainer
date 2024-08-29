'use client';

import { Button, Space, Typography } from 'antd';
import { t } from 'i18next';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { completeStep } from '../../redux/reducers/stepsSlice';
import './RegularVerbs.css';

const { Title, Text } = Typography;

export const RegularVerbs = ({ currentStep }) => {
  const { list, currentWord } = useSelector((state) => state.words);
  const [selectedOption, setSelectedOption] = useState('');
  const dispatch = useDispatch();

  const word = list.find((word) => word.word === currentWord);

  function handleSelectAnswer(isRegular) {
    setSelectedOption(isRegular);
    if (isRegular === word.isRegular) {
      dispatch(completeStep({ step: currentStep, isCompleted: true }));
    }
  }

  if (!word) {
    return (
      <Title level={3}>
        The memory is empty. Please, go to the <Link to="/">main page</Link>.
      </Title>
    );
  }

  return (
    <div style={{ textAlign: 'center', margin: 50 }}>
      {word.word ? (
        <Space direction="vertical">
          <Title level={3}>{t('is_regular')}</Title>
          <Title level={3}>{word.word}</Title>
          <p style={{ size: '30px', color: 'rgb(250, 173, 20)' }}>
            {word.translation}
          </p>

          <Space>
            <Button
              type={selectedOption === true ? 'primary' : 'dashed'}
              danger={selectedOption && selectedOption !== word.isRegular}
              onClick={() => handleSelectAnswer(true)}
            >
              Reg
            </Button>
            <Button
              type={selectedOption === false ? 'primary' : 'dashed'}
              danger={
                selectedOption === false && selectedOption !== word.isRegular
              }
              onClick={() => handleSelectAnswer(false)}
            >
              Unreg
            </Button>
          </Space>
          <div>
            <Text>{word.grundformen}</Text>
          </div>
          <Space direction="vertical">
            {word.examples?.map((v) => (
              <Text>{v}</Text>
            ))}
          </Space>
        </Space>
      ) : (
        <div style={{ color: '#fff' }}>Такого слова нет в базе</div>
      )}
    </div>
  );
};
