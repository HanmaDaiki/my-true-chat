import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/model';
import { changeTheme } from '@entities/theme';
import { logout, selectSession } from '@/src/entities/session';
import { ChangeTheme } from '@/src/features/changeTheme';

export const LayoutHeader: FC = () => {
  const session = useAppSelector(selectSession);

  const dispatch = useAppDispatch();

  const handleLogout = () => {
    localStorage.removeItem('session');
    dispatch(logout());
  };

  useEffect(() => {
    const theme = localStorage.getItem('theme');

    if (theme === 'dark' || theme === 'light') {
      dispatch(changeTheme(theme));
    }

    if (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(changeTheme('dark'));
    }
  }, []);

  return (
    <header className='px-[15px] py-[20px] flex items-center justify-between'>
      <ChangeTheme />
      {session.isAuthenticated && (
        <form className='flex items-center gap-2 justify-center' onSubmit={handleLogout}>
          <span className='text-xs font-bold text-ellipsis overflow-hidden w-[100px]'>
            {session.username}
          </span>
          <button
            type='submit'
            className='text-white bg-red-700 p-1 md:px-2 hover:bg-red-800font-medium rounded-lg text-xs w-full sm:w-auto dark:bg-red-600 dark:hover:bg-red-700'
          >
            Logout
          </button>
        </form>
      )}
    </header>
  );
};
