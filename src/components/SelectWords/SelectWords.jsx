import React, { useState } from "react";
import { Button, Radio, Space } from "antd";
import { Link, useLocation } from "react-router-dom";

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

      <div>
        {value && (
          <Link to="/regelmassigWahl" state={{ data: state, value }}>
            <Button size="large" type="primary">
              Дальше
            </Button>
          </Link>
        )}
        <Link to="/regelmassigWahl" state={{ data: state, value }}>
          <Button size="small" danger>
            Дальше (правильного ответа не существует)
          </Button>
        </Link>
      </div>
    </div>
  );
};
