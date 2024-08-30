'use client';

import { Divider, Typography } from 'antd';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { completeStep } from '../../redux/reducers/stepsSlice';
import { RootState } from '../../redux/store';
import { SelectionBlock } from '../SelectionBlock';

const { Title, Text } = Typography;

export const Present = ({ quantityForm, currentStep }) => {
  const dispatch = useDispatch();
  const { list, currentWord } = useSelector((state: RootState) => state.words);
  const [completed, setCompleted] = useState<Array<number>>([]);

  const word = list.find((word) => word.word === currentWord);

  const isCompleted = completed.length === 6;

  useEffect(() => {
    if (isCompleted) {
      dispatch(completeStep({ step: currentStep, isCompleted }));
    }
  }, [completed]);

  useEffect(() => {
    setCompleted([]);
  }, [currentStep]);

  function handleCompleteBlock(index) {
    setCompleted((prev) => [...prev.filter((v) => v !== index), index]);
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
      <Title level={3}>{t('choose_endings')}</Title>
      <Title level={3}>Presence</Title>
      <Title level={5}>{word.root}</Title>

      {Array.from(Array(3).keys()).map((v, i) => {
        const name = `${i + (quantityForm === 'single' ? 1 : 4)} form`;

        return (
          <React.Fragment key={v}>
            <div>
              <Text>{name}</Text>
              <br />
              <SelectionBlock
                index={`${v}ending`}
                word={word}
                quantity={quantityForm}
                person={i + (quantityForm === 'single' ? 1 : 4)}
                wordPart={'ending'}
                handleComplete={handleCompleteBlock}
              />
              <br />
              <SelectionBlock
                index={`${v}vowel`}
                word={word}
                quantity={quantityForm}
                person={i + (quantityForm === 'single' ? 1 : 4)}
                wordPart={'vowel'}
                handleComplete={handleCompleteBlock}
              />
            </div>
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};
