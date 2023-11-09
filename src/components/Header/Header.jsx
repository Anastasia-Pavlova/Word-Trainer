import React from "react";
import { Space, Switch, Typography, theme } from "antd";
import { Header as StandardHeader } from "antd/es/layout/layout";
import { useDispatch, useSelector } from "react-redux";
import { changeAlgorithm } from "../../redux/reducers/themeSlice";

const { Text } = Typography;

export const Header = () => {
  const { theme: globalTheme } = useSelector((state) => state);
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  function handleChangeTheme(checked) {
    const value = checked ? "darkAlgorithm" : "defaultAlgorithm";
    dispatch(changeAlgorithm(value));
    localStorage.setItem("theme", value);
  }

  return (
    <StandardHeader
      style={{
        textAlign: "right",
        background:
          globalTheme.algorithm === "defaultAlgorithm" && colorBgContainer,
      }}
    >
      <Space>
        <Switch
          checked={globalTheme.algorithm === "darkAlgorithm"}
          onChange={handleChangeTheme}
        />
        <Text>
          {globalTheme.algorithm === "darkAlgorithm" ? (
            <>Dark &#127769;</>
          ) : (
            <>Light &#9728;</>
          )}
        </Text>
      </Space>
    </StandardHeader>
  );
};
