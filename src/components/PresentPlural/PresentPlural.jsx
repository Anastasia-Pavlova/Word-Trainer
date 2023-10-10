import React, { useState } from "react";
import { Typography, Divider, Button } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import { SelectionBlock } from "../SelectionBlock";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWordCompleted } from "../../redux/reducers/wordsSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const PresentPlural = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentWord } = useSelector((state) => state.words);
  const [completed, setCompleted] = useState([]);
  const word = list.find((word) => word.word === currentWord);

  function handleCompleteBlock(index) {
    setCompleted((prev) => [...prev.filter((v) => v !== index), index]);
  }

  const isCompleted = completed.length === 6;

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Title level={3}>Presence</Title>
      <Title level={5}>{word.root}</Title>

      {Array.from(Array(3).keys()).map((v, i) => {
        const name =
          i === 0
            ? "Четвертая форма"
            : i === 1
            ? "Пятая форма"
            : "Шестая форма";
        return (
          <React.Fragment key={v}>
            <div>
              <Text>{name}</Text>
              <br />
              <SelectionBlock
                index={`${v}ending`}
                word={word}
                quantity={"plural"}
                person={i + 4}
                wordPart={"ending"}
                handleComplete={handleCompleteBlock}
              />
              <br />
              <SelectionBlock
                index={`${v}vowel`}
                word={word}
                quantity={"plural"}
                person={i + 4}
                wordPart={"vowel"}
                handleComplete={handleCompleteBlock}
              />
            </div>
            <Divider />
          </React.Fragment>
        );
      })}

      <Button
        onClick={() => {
          dispatch(setCurrentWordCompleted());
          navigate("/select");
        }}
      >
        Complete
      </Button>

      <FooterButtons showButtonCondition={isCompleted} />
    </div>
  );
};
