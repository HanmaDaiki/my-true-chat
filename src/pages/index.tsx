import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@shared/model';
import { selectSession } from '@entities/session';
import { Login } from './login/Login';
import { Chat } from './chat/Chat';

export const Routing = () => {
  const session = useAppSelector(selectSession);

  return (
    <Routes>
      <Route path='/login' element={session.isAuthenticated ? <Navigate to='/chat' /> : <Login />} />
      <Route path='/chat' element={session.isAuthenticated ? <Chat /> : <Navigate to='/login' />} />
      <Route
        path='*'
        element={<Navigate to={session.isAuthenticated ? '/chat' : '/login'} replace={true} />}
      />
    </Routes>
  );
};
