'use client';

import { Button, Space } from 'antd';
import { useEffect, useState } from 'react';

import { CheckCircleTwoTone } from '@ant-design/icons';
import answers from '../../answers.json';

export const SelectionBlock = ({
  index,
  word,
  quantity,
  person,
  wordPart,
  handleComplete,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  const [correctValues, setCorrectValues] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (
      (correctValues.length && wordPart === 'vowel') ||
      correctValues.length === word[quantity][person][wordPart].length
    ) {
      setIsCompleted(true);
      handleComplete(index);
    }
  }, [correctValues.length]);

  useEffect(() => {
    setIsCompleted(false);
    setCorrectValues([]);
    setSelectedValue();
  }, [quantity]);

  const isCorrect =
    wordPart === 'ending'
      ? word[quantity][person][wordPart]?.some((v) => v === selectedValue)
      : word[quantity][person][wordPart] === selectedValue;

  function handleChangeValue(value) {
    setSelectedValue(value);
    const isCorrect =
      wordPart === 'ending'
        ? word[quantity][person][wordPart]?.some((v) => v === value)
        : word[quantity][person][wordPart] === value;
    isCorrect && setCorrectValues((prev) => [...prev, value]);
  }

  return (
    <div>
      <Space>
        <div>
          {answers[wordPart].map((v) => (
            <Button
              onClick={() => handleChangeValue(v)}
              type={
                correctValues.find((value) => value === v)
                  ? 'primary'
                  : 'default'
              }
              danger={selectedValue && selectedValue === v && !isCorrect}
              key={v}
              value={v}
            >
              {v}
            </Button>
          ))}
        </div>
        {isCompleted && <CheckCircleTwoTone />}
      </Space>
    </div>
  );
};
