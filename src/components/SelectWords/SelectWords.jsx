import React, { useState } from "react";
import { Radio, Space } from "antd";
import { useLocation } from "react-router-dom";
import { FooterButtons } from "../FooterButtons/FooterButtons";

export const SelectWords = () => {
  const [value, setValue] = useState("");
  const { state } = useLocation();

  function handleChangeValue(e) {
    setValue(e.target.value);
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Radio.Group value={value} onChange={handleChangeValue}>
        <Space direction="vertical">
          {state.map((word) => (
            <Radio value={word.word}>{word.word}</Radio>
          ))}
        </Space>
      </Radio.Group>

      <FooterButtons
        link="/regelmassigWahl"
        state={{ data: state, value }}
        showButtonCondition={value}
      />
    </div>
  );
};
