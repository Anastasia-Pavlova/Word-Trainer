import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Typography, Button } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import "./RegularVerbs.css";

const { Title } = Typography;

export const RegularVerbs = () => {
  const { state } = useLocation();
  const [selectedOption, setSelectedOption] = useState("");

  const word = state.data.find((word) => word.word === state.value);

  function handleSelectAnswer(isRegular) {
    setSelectedOption(isRegular);
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      {word.word ? (
        <>
          <Title level={3}>{word.word}</Title>
          <p style={{ size: "30px", color: "rgb(250, 173, 20)" }}>
            {word.translation}
          </p>

          <Button
            type={selectedOption === true ? "primary" : "dashed"}
            danger={selectedOption && selectedOption !== word.isRegular}
            onClick={() => handleSelectAnswer(true)}
          >
            Reg
          </Button>
          <Button
            type={selectedOption === false ? "primary" : "dashed"}
            danger={
              selectedOption === false && selectedOption !== word.isRegular
            }
            onClick={() => handleSelectAnswer(false)}
          >
            Unreg
          </Button>

          <FooterButtons
            link="/presentSingle"
            state={state}
            showButtonCondition={selectedOption === word.isRegular}
          />
        </>
      ) : (
        <div style={{ color: "#fff" }}>Такого слова нет в базе</div>
      )}
    </div>
  );
};
