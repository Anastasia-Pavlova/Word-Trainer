import React from "react";
import { Button, Flex } from "antd";
import { useDispatch } from "react-redux";
import { completeStep } from "../../redux/reducers/stepsSlice";
import { useTranslation } from "react-i18next";

export const FooterButtons = ({
  current,
  showButtonCondition,
  isLast,
  onChangeStep,
  onComplete,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  function handleChangeStep(value) {
    onChangeStep(value);
    dispatch(completeStep(current));
  }

  return (
    <Flex wrap="wrap" gap="small" justify="center">
      {current > 0 && (
        <Button size="large" onClick={() => handleChangeStep(-1)}>
          {t("back")}
        </Button>
      )}
      <Button
        size="large"
        type="primary"
        disabled={!showButtonCondition}
        onClick={() => (isLast ? onComplete() : handleChangeStep(1))}
      >
        {isLast ? t("complete") : t("continue")}
      </Button>
      {current > 1 && (
        <Button
          size="small"
          danger
          onClick={() => (isLast ? onComplete() : handleChangeStep(1))}
        >
          {isLast ? t("complete") : t("continue")}
          <br />( {t("no_answer")})
        </Button>
      )}
    </Flex>
  );
};
