import { useState } from "react";
import {
  Button,
  ConfigProvider,
  Layout,
  Space,
  Steps,
  Switch,
  Typography,
  theme,
} from "antd";
import { Content, Footer, Header } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Input from "antd/es/input/Input";
import { FileOutlined } from "@ant-design/icons";
import { changeAlgorithm } from "./redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { FooterButtons } from "./components/FooterButtons";
import { addWords } from "./redux/reducers/wordsSlice";
import { completeStep } from "./redux/reducers/stepsSlice";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { PresentSingle } from "./components/Present";

import data from "./example.json";
import "./App.css";

const { Text } = Typography;

function App() {
  const { steps, theme: globalTheme } = useSelector((state) => state);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const stepTitles = [
    "Choose the file",
    "Select words",
    "Is the word regular",
    "Present (1)",
    "Present (2)",
    "Präteritum (1)",
    "Präteritum (2)",
  ];

  const onStepChange = (value) => {
    setCurrent(value);
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        dispatch(addWords(data));
        dispatch(completeStep(current));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  function handleUseSampleFile() {
    dispatch(addWords(data));
    dispatch(completeStep(current));
  }

  function handleChangeTheme(checked) {
    const value = checked ? "darkAlgorithm" : "defaultAlgorithm";
    dispatch(changeAlgorithm(value));
  }

  function getStepData(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div>
              <Input
                type="file"
                onChange={handleUpload}
                className="uploadInput"
                prefix={<FileOutlined />}
              />
            </div>
            <Text>or</Text>
            <div>
              <Button onClick={handleUseSampleFile}>Use sample file</Button>
            </div>
          </>
        );

      case 1:
        return <SelectWords currentStep={current} />;

      case 2:
        return <RegularVerbs currentStep={current} />;

      case 3:
        return <PresentSingle quantityForm={"single"} currentStep={current} />;

      case 4:
        return <PresentSingle quantityForm={"plural"} currentStep={current} />;

      default:
        break;
    }
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme[globalTheme.algorithm],
      }}
    >
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            textAlign: "right",
            background:
              globalTheme.algorithm === "defaultAlgorithm" && colorBgContainer,
          }}
        >
          <Space>
            <Switch defaultChecked onChange={handleChangeTheme} />
            <Text>
              {globalTheme.algorithm === "darkAlgorithm" ? (
                <>Dark &#127769;</>
              ) : (
                <>Light &#9728;</>
              )}
            </Text>
          </Space>
        </Header>
        <div style={{ textAlign: "center", margin: 50 }}>
          <Layout hasSider>
            <Sider
              width={window.innerWidth > 700 ? 200 : 50}
              style={{
                background:
                  globalTheme.algorithm === "defaultAlgorithm" &&
                  colorBgContainer,
              }}
            >
              <Steps
                current={current}
                onChange={onStepChange}
                direction="vertical"
                items={stepTitles.map((stepTitle, index) => {
                  return {
                    title: window.innerWidth > 700 ? stepTitle : "",
                    disabled:
                      !steps.completedSteps.includes(index) &&
                      current <= index - 1,
                  };
                })}
              />
            </Sider>
            <Content>{getStepData(current)}</Content>
            <Footer>
              <FooterButtons
                current={current}
                showButtonCondition={steps.completedSteps.some(
                  (step) => step === current
                )}
                onChangeStep={(value) => setCurrent(current + value)}
              />
            </Footer>
          </Layout>
        </div>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
