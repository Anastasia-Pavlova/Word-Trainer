'use client';

import { Radio } from 'antd';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export const Language = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState();

  useEffect(() => {
    const lng = router.pathname.replace('/', '');
    setLanguage(router.locale || 'en');
  }, []);

  function handleChange(e) {
    router.push('/', '/', { locale: e.target.value });
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
