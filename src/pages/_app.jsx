import { appWithTranslation } from 'next-i18next';
import React from 'react';
import { Provider } from 'react-redux';
import '../../next-i18next.config';
import nextI18NextConfig from '../../next-i18next.config';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { makeStore } from '../redux/store';
import '../styles.css';

function App({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={makeStore()}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

export default appWithTranslation(App, nextI18NextConfig);
