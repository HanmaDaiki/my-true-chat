import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@shared/model';
import { selectSession } from '@entities/session';

const Chat = lazy(() => import('./chat'));
const Login = lazy(() => import('./login'));

export const Routing = () => {
  const session = useAppSelector(selectSession);

  return (
    <Routes>
      <Route path='/' element={session.isAuthenticated ? <Chat /> : <Login />} />
      <Route path='*' element={<Navigate to={'/'} />} />
    </Routes>
  );
};
