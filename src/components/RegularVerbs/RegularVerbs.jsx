import React, { useState } from "react";
import { Typography, Button } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import { useSelector } from "react-redux";
import "./RegularVerbs.css";

const { Title } = Typography;

export const RegularVerbs = () => {
  const { list, currentWord } = useSelector((state) => state.words);
  const [selectedOption, setSelectedOption] = useState("");

  const word = list.find((word) => word.word === currentWord);

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
            showButtonCondition={selectedOption === word.isRegular}
          />
        </>
      ) : (
        <div style={{ color: "#fff" }}>Такого слова нет в базе</div>
      )}
    </div>
  );
};
