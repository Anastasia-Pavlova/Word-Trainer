'use client';

import { Button, Flex } from 'antd';
import { useTranslation } from 'next-i18next';
import { useDispatch } from 'react-redux';
import { completeStep } from '../../redux/reducers/stepsSlice';

export const FooterButtons = ({
  current,
  showButtonCondition,
  isLast,
  onChangeStep,
  onComplete,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleChangeStep(value, isCompleted) {
    onChangeStep(value);
    dispatch(completeStep({ step: current, isCompleted }));
  }

  return (
    <Flex wrap="wrap" gap="small" justify="center">
      {current > 0 && (
        <Button size="large" onClick={() => handleChangeStep(-1)}>
          {t('back')}
        </Button>
      )}
      <Button
        size="large"
        type="primary"
        danger={!showButtonCondition && isLast}
        disabled={!showButtonCondition && !isLast}
        onClick={() => (isLast ? onComplete() : handleChangeStep(1, true))}
      >
        {isLast ? t('complete') : t('continue')}
      </Button>
      {current > 1 && !isLast && (
        <Button
          size="large"
          danger
          onClick={() => (isLast ? onComplete() : handleChangeStep(1, false))}
        >
          {t('skip')}
        </Button>
      )}
    </Flex>
  );
};
