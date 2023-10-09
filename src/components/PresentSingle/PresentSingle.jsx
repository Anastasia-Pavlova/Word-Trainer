import React from "react";
import { useLocation, Link } from "react-router-dom";
import { Typography, Button, List, Radio, Divider } from "antd";

import answers from "../../answers.json";
const { Title, Text } = Typography;

export const PresentSingle = () => {
  const { state } = useLocation();

  const word = state.data.find((word) => word.word === state.value);

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Title level={3}>Presence</Title>
      <Title level={5}>{word.root}</Title>

      <div>
        <Text>Первая форма</Text>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.vocabels.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.endings.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <Divider />
      <div>
        <Text>Вторая форма</Text>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.vocabels.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.endings.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
      </div>

      <Divider />
      <div>
        <Text>Третья форма</Text>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.vocabels.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
        <br />
        <Radio.Group onChange={() => {}}>
          {answers.endings.map((v) => (
            <Radio.Button value={v}>{v}</Radio.Button>
          ))}
        </Radio.Group>
      </div>
      <div>
        {/* {selectedOption === word.isRegular && ( */}
        <Link to="/presentSingle" state={state}>
          <Button size="large" type="primary">
            Дальше
          </Button>
        </Link>
        {/* )} */}
        <Link to="/presentSingle" state={state}>
          <Button size="small" danger>
            Дальше (правильного ответа не существует)
          </Button>
        </Link>
      </div>
    </div>
  );
};
