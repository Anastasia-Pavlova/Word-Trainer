import React from "react";
import { Typography, Divider, Button } from "antd";
import { FooterButtons } from "../FooterButtons/FooterButtons";
import { SelectionBlock } from "./SelectionBlock/SelectionBlock";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWordCompleted } from "../../redux/reducers/wordsSlice";
import { useNavigate } from "react-router-dom";

const { Title, Text } = Typography;

export const PresentSingle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentWord } = useSelector((state) => state.words);
  const word = list.find((word) => word.word === currentWord);

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

      <Button
        onClick={() => {
          dispatch(setCurrentWordCompleted());
          navigate("/select");
        }}
      >
        Complete
      </Button>

      <FooterButtons showButtonCondition={true} />
    </div>
  );
};
