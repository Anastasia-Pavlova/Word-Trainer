import React from "react";
import { useLocation } from "react-router-dom";
import { Typography, Divider } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import { SelectionBlock } from "./SelectionBlock/SelectionBlock";

const { Title, Text } = Typography;

export const PresentSingle = () => {
  const { state } = useLocation();

  const word = state.data.find((word) => word.word === state.value);

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Title level={3}>Presence</Title>
      <Title level={5}>{word.root}</Title>

      {Array(3)
        .fill(Math.random)
        .map((_v, i) => {
          const name =
            i === 0
              ? "Первая форма"
              : i === 1
              ? "Вторая форма"
              : "Третья форма";
          return (
            <React.Fragment key={i}>
              <div>
                <Text>{name}</Text>
                <br />
                <SelectionBlock
                  word={word}
                  quantity={"single"}
                  person={i + 1}
                  wordPart={"ending"}
                />
                <br />
                <SelectionBlock
                  word={word}
                  quantity={"single"}
                  person={i + 1}
                  wordPart={"vowel"}
                />
              </div>
              <Divider />
            </React.Fragment>
          );
        })}

      <FooterButtons state={state} showButtonCondition={true} />
    </div>
  );
};
