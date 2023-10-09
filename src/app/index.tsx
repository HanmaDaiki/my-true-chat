/* eslint-disable react-refresh/only-export-components */
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useAppSelector, useAppDispatch } from '@shared/model';
import { selectCurrentTheme } from '@entities/theme';
import { login } from '@entities/session';
import { LayoutHeader } from '@widgets/LayoutHeader';
import { withProviders } from '@app/provider';
import { Routing } from '@pages/index';

import './styles/normalize.css';
import './styles/index.css';

const App = () => {
  const currentTheme = useAppSelector(selectCurrentTheme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const session = JSON.parse(localStorage.getItem('session') || '{}');

    if (session.sessionId && session.username) {
      dispatch(login({ ...session, isAuthenticated: true }));
    }
  }, []);

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
