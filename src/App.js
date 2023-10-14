import { useState } from "react";
import { Button, Steps, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FooterButtons } from "./components/FooterButtons";
import { addWords } from "./redux/reducers/wordsSlice";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { PresentSingle } from "./components/PresentSingle";
import { PresentPlural } from "./components/PresentPlural";
import data from "./WordsArray.json";

import "./App.css";
import { completeStep } from "./redux/reducers/stepsSlice";

const { Text } = Typography;

function App() {
  const { isStepCompleted } = useSelector((state) => state.steps);
  const [fileData, setFileData] = useState();
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const onStepChange = (value) => {
    setCurrent(value);
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        setFileData(data);
        dispatch(addWords(data));
        dispatch(completeStep(true));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  function handleUseSampleFile() {
    setFileData(data);
    dispatch(addWords(data));
    dispatch(completeStep(true));
  }

  function getStepData(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              <input
                type="file"
                onChange={handleUpload}
                className="uploadInput"
              />
            </div>
            <Text>or</Text>
            <div>
              <Button onClick={handleUseSampleFile}>Use sample file</Button>
            </div>
          </>
        );

      case 1:
        return <SelectWords />;

      case 2:
        return <RegularVerbs />;

      case 3:
        return <PresentSingle />;

      case 4:
        return <PresentPlural />;

      default:
        break;
    }
  }

  return (
    <div style={{ textAlign: "center", margin: 50 }}>
      <Steps
        current={current}
        onChange={onStepChange}
        // direction="vertical"
        items={[
          {
            title: "Choose the file",
          },
          {
            title: "Select words",
          },
          {
            title: "Is the word regular",
          },
          {
            title: "Present (1)",
          },
          {
            title: "Present (2)",
          },
          {
            title: "Präteritum (1)",
          },
          {
            title: "Präteritum  (2)",
          },
        ]}
      />
      <div>{getStepData(current)}</div>

      <FooterButtons
        current
        showButtonCondition={isStepCompleted}
        onChangeStep={(value) => setCurrent(current + value)}
      />
    </div>
  );
}

export default App;
