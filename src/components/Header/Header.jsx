'use client';

import { Space, Switch, Typography, theme } from 'antd';
import { Header as StandardHeader } from 'antd/es/layout/layout';
import { useTranslation } from 'next-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { changeAlgorithm } from '../../redux/reducers/themeSlice';
import { Language } from './Language/';

const { Text } = Typography;

export const Header = () => {
  const { t } = useTranslation();
  const { theme: globalTheme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleChangeTheme(checked) {
    const value = checked ? 'darkAlgorithm' : 'defaultAlgorithm';
    dispatch(changeAlgorithm(value));
    localStorage.setItem('theme', value);
  }

  return (
    <StandardHeader
      style={{
        textAlign: 'right',
        background:
          globalTheme.algorithm === 'defaultAlgorithm'
            ? colorBgContainer
            : 'transparent',
      }}
    >
      <Space>
        <Language />
        <Switch
          checked={globalTheme.algorithm === 'darkAlgorithm'}
          onChange={handleChangeTheme}
        />
        <Text>
          {globalTheme.algorithm === 'darkAlgorithm' ? (
            <>{t('dark')} &#127769;</>
          ) : (
            <>{t('light')} &#9728;</>
          )}
        </Text>
      </Space>
    </StandardHeader>
  );
};
