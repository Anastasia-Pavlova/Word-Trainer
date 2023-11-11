import { Radio } from "antd";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export const Language = () => {
  const { _t, i18n } = useTranslation();
  const [language, setLanguage] = useState();

  useEffect(() => {
    const lng = localStorage.getItem("language", i18n.language);
    lng && i18n.changeLanguage(lng);
    setLanguage(lng || "en");
  }, []);

  function handleChange(e) {
    i18n.changeLanguage(e.target.value);
    localStorage.setItem("language", e.target.value);
    setLanguage(e.target.value);
  }
  return (
    <Radio.Group
      value={language}
      buttonStyle="solid"
      size="small"
      onChange={handleChange}
    >
      <Radio.Button value="en">EN</Radio.Button>
      <Radio.Button value="ru">RU</Radio.Button>
    </Radio.Group>
  );
};
