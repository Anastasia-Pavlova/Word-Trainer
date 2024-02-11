import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ConfigProvider, Layout, Steps, theme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import { changeAlgorithm } from "./redux/reducers/themeSlice";
import { useDispatch, useSelector } from "react-redux";

import { FooterButtons } from "./components/FooterButtons";
import { SelectWords } from "./components/SelectWords";
import { RegularVerbs } from "./components/RegularVerbs";
import { Present } from "./components/Present";
import { Header } from "./components/Header/Header";
import { UploadDocument } from "./components/UploadDocument/UploadDocument";
import "./App.css";
import { setCurrentWordCompleted } from "./redux/reducers/wordsSlice";

function App() {
  const { t } = useTranslation();
  const { steps, theme: globalTheme } = useSelector((state) => state);
  const { currentWord } = useSelector((state) => state.words);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const stepTitles = [
    t("choose_file"),
    t("select_words"),
    t("regular"),
    t("Present (1)"),
    t("Present (2)"),
    // t("Präteritum (1)"),
    // t("Präteritum (2)"),
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    savedTheme && dispatch(changeAlgorithm(savedTheme));
  }, []);

  const onStepChange = (value) => {
    setCurrent(value);
  };

  const handleComplete = () => {
    setCurrent(1);
    dispatch(setCurrentWordCompleted(currentWord));
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
        return <Present quantityForm={"single"} currentStep={current} />;

      case 4:
        return <Present quantityForm={"plural"} currentStep={current} />;

      // case 5:
      //   return <Present quantityForm={"single"} currentStep={current} />;

      // case 6:
      //   return <Present quantityForm={"plural"} currentStep={current} />;

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
        {window.innerWidth > 700 && (
          <Sider
            width={300}
            style={{
              background:
                globalTheme.algorithm === "defaultAlgorithm" &&
                colorBgContainer,
            }}
          >
            <Steps
              style={{ margin: "50px 0 0 50px" }}
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
        )}
        <Layout>
          <Header />
          <div style={{ textAlign: "center", margin: 0 }}>
            {window.innerWidth <= 700 && (
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
            <Content style={{ marginTop: 50, minHeight: 300 }}>
              {getStepData(current)}
            </Content>
          </div>
          <Footer>
            <FooterButtons
              current={current}
              showButtonCondition={steps.completedSteps.some(
                (step) => step === current
              )}
              isLast={current === stepTitles.length - 1}
              onChangeStep={(value) => setCurrent(current + value)}
              onComplete={handleComplete}
            />
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}

export default App;
