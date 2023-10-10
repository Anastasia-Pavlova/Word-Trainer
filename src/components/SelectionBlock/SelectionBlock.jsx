import React, { useEffect, useState } from "react";
import { Button } from "antd";

import answers from "../../answers.json";

export const SelectionBlock = ({
  index,
  word,
  quantity,
  person,
  wordPart,
  handleComplete,
}) => {
  const [selectedValue, setSelectedValue] = useState();
  const [correctValues, setCorrectValues] = useState([]);

  useEffect(() => {
    if (
      (correctValues.length && wordPart === "vowel") ||
      correctValues.length === word[quantity][person][wordPart].length
    ) {
      console.log("complete");
      handleComplete(index);
    }
  }, [correctValues.length]);

  const isCorrect =
    wordPart === "ending"
      ? word[quantity][person][wordPart]?.some((v) => v === selectedValue)
      : word[quantity][person][wordPart] === selectedValue;

  function handleChangeValue(value) {
    setSelectedValue(value);
    const isCorrect =
      wordPart === "ending"
        ? word[quantity][person][wordPart]?.some((v) => v === value)
        : word[quantity][person][wordPart] === value;
    isCorrect && setCorrectValues((prev) => [...prev, value]);
  }

  return (
    <div>
      {answers[wordPart].map((v) => (
        <Button
          onClick={() => handleChangeValue(v)}
          type={
            correctValues.find((value) => value === v) ? "primary" : "default"
          }
          danger={selectedValue && selectedValue === v && !isCorrect}
          key={v}
          value={v}
        >
          {v}
        </Button>
      ))}
    </div>
  );
};
