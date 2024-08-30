'use client';

import { ConfigProvider, Layout, Steps, Typography, theme } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Footer } from 'antd/es/layout/layout';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useDeviceSize } from '../../hooks/useDeviceSize';
import { resetSteps } from '../../redux/reducers/stepsSlice';
import { changeAlgorithm } from '../../redux/reducers/themeSlice';
import { setCurrentWordCompleted } from '../../redux/reducers/wordsSlice';
import { RootState } from '../../redux/store';
import { FooterButtons } from '../FooterButtons';
import { Header } from '../Header/Header';
import { Present } from '../Present';
import { RegularVerbs } from '../RegularVerbs';
import { SelectWords } from '../SelectWords';
import { UploadDocument } from '../UploadDocument';

const { Text } = Typography;

export function HomeLayout() {
  const { t } = useTranslation();
  const [width] = useDeviceSize();
  const { steps, theme: globalTheme } = useSelector(
    (state: RootState) => state
  );
  const { currentWord } = useSelector((state: RootState) => state.words);
  const words = useSelector((state: RootState) => state.words.list);
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const stepTitles = [
    t('choose_file'),
    t('select_words'),
    t('regular'),
    t('Present (1)'),
    t('Present (2)'),
    // t("Präteritum (1)"),
    // t("Präteritum (2)"),
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    savedTheme && dispatch(changeAlgorithm(savedTheme));
  }, []);

  const onStepChange = (value) => {
    setCurrent(value);
  };

  const handleComplete = () => {
    const isCompleted = steps.completedSteps.some(
      (step) => step.step === current
    );
    setCurrent(1);
    dispatch(setCurrentWordCompleted(isCompleted));
    dispatch(resetSteps());
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
        return <Present quantityForm={'single'} currentStep={current} />;

      case 4:
        return <Present quantityForm={'plural'} currentStep={current} />;

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
      <Layout style={{ minHeight: '100vh' }}>
        {width > 700 && (
          <Sider
            width={300}
            style={{
              background:
                globalTheme.algorithm === 'defaultAlgorithm'
                  ? colorBgContainer
                  : 'transparent',
            }}
          >
            <Steps
              style={{ margin: '50px 0 0 50px' }}
              current={current}
              onChange={onStepChange}
              direction="vertical"
              items={stepTitles.map((stepTitle, index) => {
                return {
                  title: stepTitle,
                  disabled:
                    !steps.completedSteps.includes({
                      step: index,
                      isCompleted: true || false,
                    }) && current <= index - 1,
                };
              })}
            />
          </Sider>
        )}

        <Layout>
          <Header />
          <div style={{ textAlign: 'center', margin: 0 }}>
            {width <= 700 && (
              <Steps
                style={{ flexWrap: 'wrap' }}
                current={current}
                onChange={onStepChange}
                type="inline"
                responsive={false}
                items={stepTitles.map((stepTitle, index) => {
                  return {
                    title: stepTitle,
                    disabled:
                      !steps.completedSteps.includes({
                        step: index,
                        isCompleted: true || false,
                      }) && current <= index - 1,
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
                (step) => step.step === current
              )}
              isLast={current === stepTitles.length - 1}
              onChangeStep={(value) => setCurrent(current + value)}
              onComplete={handleComplete}
            />
            <Text>
              Completed words: {words.filter((v) => v.isCompleted).length} from{' '}
              {words.length}
            </Text>
          </Footer>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
}
