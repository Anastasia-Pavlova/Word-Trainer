import React, { useEffect, useState } from "react";
import { Typography, Divider, Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentWordCompleted } from "../../redux/reducers/wordsSlice";
import { completeStep } from "../../redux/reducers/stepsSlice";
import { SelectionBlock } from "../SelectionBlock";

const { Title, Text } = Typography;

export const PresentSingle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentWord } = useSelector((state) => state.words);
  const [completed, setCompleted] = useState([]);

  const word = list.find((word) => word.word === currentWord);
  const isCompleted = completed.length === 6;

  useEffect(() => {
    isCompleted && dispatch(completeStep(true));
  }, [completed]);

  function handleCompleteBlock(index) {
    setCompleted((prev) => [...prev.filter((v) => v !== index), index]);
  }

  if (!word) {
    return (
      <Title level={3}>
        The memory is empty. Please, go to the <Link to="/">main page</Link>.
      </Title>
    );
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Title level={3}>Presence</Title>
      <Title level={5}>{word.root}</Title>

      {Array.from(Array(3).keys()).map((v, i) => {
        const name =
          i === 0 ? "Первая форма" : i === 1 ? "Вторая форма" : "Третья форма";
        return (
          <React.Fragment key={v}>
            <div>
              <Text>{name}</Text>
              <br />
              <SelectionBlock
                index={`${v}ending`}
                word={word}
                quantity={"single"}
                person={i + 1}
                wordPart={"ending"}
                handleComplete={handleCompleteBlock}
              />
              <br />
              <SelectionBlock
                index={`${v}vowel`}
                word={word}
                quantity={"single"}
                person={i + 1}
                wordPart={"vowel"}
                handleComplete={handleCompleteBlock}
              />
            </div>
            <Divider />
          </React.Fragment>
        );
      })}
    </div>
  );
};
