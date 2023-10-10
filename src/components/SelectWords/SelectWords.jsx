import React, { useState } from "react";
import { Radio, Space } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentWord } from "../../redux/reducers/wordsSlice";

export const SelectWords = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState("");
  const words = useSelector((state) => state.words.list);

  function handleChangeValue(e) {
    setValue(e.target.value);
    dispatch(setCurrentWord(e.target.value));
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Radio.Group value={value} onChange={handleChangeValue}>
        <Space direction="vertical">
          {words.map((word) => (
            <Radio key={word.word} disabled={word.isUsed} value={word.word}>
              {word.word}
            </Radio>
          ))}
        </Space>
      </Radio.Group>

      <FooterButtons link="/regelmassigWahl" showButtonCondition={value} />
    </div>
  );
};
