import { useEffect, useState } from "react";
import { ConfigProvider, Layout, Steps, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { changeAlgorithm } from "./redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { FooterButtons } from "./components/FooterButtons";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { PresentSingle } from "./components/Present";
import { Header } from "./components/Header/Header";
import { UploadDocument } from "./components/UploadDocument/UploadDocument";
import "./App.css";

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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    savedTheme && dispatch(changeAlgorithm(savedTheme));
  }, []);

  const onStepChange = (value) => {
    setCurrent(value);
  };

  function getStepData(step) {
    switch (step) {
      case 0:
        return <UploadDocument currentStep={current} />;

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
        <Header />

        <div style={{ textAlign: "center", margin: 50 }}>
          <Layout hasSider={window.innerWidth > 700}>
            {window.innerWidth > 700 ? (
              <Sider
                width={200}
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
                      title: stepTitle,
                      disabled:
                        !steps.completedSteps.includes(index) &&
                        current <= index - 1,
                    };
                  })}
                />
              </Sider>
            ) : (
              <Steps
                style={{ flexWrap: "wrap" }}
                current={current}
                onChange={onStepChange}
                type="inline"
                responsive={false}
                items={stepTitles.map((stepTitle, index) => {
                  return {
                    title: stepTitle,
                    disabled:
                      !steps.completedSteps.includes(index) &&
                      current <= index - 1,
                  };
                })}
              />
            )}

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
