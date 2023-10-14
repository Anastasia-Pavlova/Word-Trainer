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
import { changeAlgorithm } from "./redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";
import { FooterButtons } from "./components/FooterButtons";
import { addWords } from "./redux/reducers/wordsSlice";
import { completeStep } from "./redux/reducers/stepsSlice";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { PresentSingle } from "./components/Present";

import data from "./WordsArray.json";
import "./App.css";

const { Text } = Typography;

function App() {
  const { steps, theme: globalTheme } = useSelector((state) => state);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onStepChange = (value) => {
    setCurrent(value);
  };

  function handleUpload(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        dispatch(addWords(data));
        dispatch(completeStep(true));
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file);
  }

  function handleUseSampleFile() {
    dispatch(addWords(data));
    dispatch(completeStep(true));
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
        return <PresentSingle quantityForm={"single"} />;

      case 4:
        return <PresentSingle quantityForm={"plural"} />;

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
            </Sider>
            <Content>{getStepData(current)}</Content>
            <Footer>
              <FooterButtons
                current
                showButtonCondition={steps.isStepCompleted}
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
