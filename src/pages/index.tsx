import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { HomeLayout } from '../components/HomeLayout/HomeLayout';

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', null, ['en', 'ru']])),
      // Will be passed to the page component as props
    },
  };
}

export default function Home() {
  return <HomeLayout />;
}
