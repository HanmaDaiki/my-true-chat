/* eslint-disable react-refresh/only-export-components */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { useAppSelector } from '@shared/model';
import { selectCurrentTheme } from '@entities/theme';
import { LayoutHeader } from '@widgets/LayoutHeader';
import { withProviders } from '@app/provider';
import { Routing } from '@pages/index';

import './styles/normalize.css';
import './styles/index.css';

const App = () => {
  const currentTheme = useAppSelector(selectCurrentTheme);

  return (
    <div
      className={`h-full w-full mx-auto
    ${currentTheme}`}
    >
      <LayoutHeader />
      <Routing />
    </div>
  );
};

const AppWithProviders = withProviders(<App />);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppWithProviders />
  </React.StrictMode>
);
