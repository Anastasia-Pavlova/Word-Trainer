import React, { useEffect, useState } from "react";
import { Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { completeStep } from "../../redux/reducers/stepsSlice";
import { SelectionBlock } from "../SelectionBlock";

const { Title, Text } = Typography;

export const Present = ({ quantityForm, currentStep }) => {
  const dispatch = useDispatch();
  const { list, currentWord } = useSelector((state) => state.words);
  const [completed, setCompleted] = useState([]);

  const word = list.find((word) => word.word === currentWord);

  const isCompleted = completed.length === 6;

  useEffect(() => {
    if (isCompleted) {
      dispatch(completeStep(currentStep));
    }
  }, [completed]);

  useEffect(() => {
    setCompleted([]);
  }, [currentStep]);

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
        const name = `${i + (quantityForm === "single" ? 1 : 4)} form`;

        return (
          <React.Fragment key={v}>
            <div>
              <Text>{name}</Text>
              <br />
              <SelectionBlock
                index={`${v}ending`}
                word={word}
                quantity={quantityForm}
                person={i + (quantityForm === "single" ? 1 : 4)}
                wordPart={"ending"}
                handleComplete={handleCompleteBlock}
              />
              <br />
              <SelectionBlock
                index={`${v}vowel`}
                word={word}
                quantity={quantityForm}
                person={i + (quantityForm === "single" ? 1 : 4)}
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
