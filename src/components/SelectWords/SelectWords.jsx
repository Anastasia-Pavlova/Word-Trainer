import React, { useState } from "react";
import { Radio, Space, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { setCurrentWord } from "../../redux/reducers/wordsSlice";
import { completeStep } from "../../redux/reducers/stepsSlice";

const { Title } = Typography;

export const SelectWords = ({ currentStep }) => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const words = useSelector((state) => state.words.list);

  function handleChangeValue(e) {
    setValue(e.target.value);
    dispatch(setCurrentWord(e.target.value));
    dispatch(completeStep(currentStep));
  }

  return (
    <Space direction="vertical">
      <Title level={4}>{t("choose_word")}</Title>

      <Radio.Group value={value} onChange={handleChangeValue}>
        <Space direction="vertical">
          {words.map((word) => (
            <Radio key={word.word} disabled={word.isUsed} value={word.word}>
              {word.word}
            </Radio>
          ))}
        </Space>
      </Radio.Group>
    </Space>
  );
};
