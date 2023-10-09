import { FC } from 'react';
import { useAppDispatch, useAppSelector } from '@shared/model';
import { Button } from '@shared/ui';
import { changeTheme, selectCurrentTheme } from '@entities/theme';

export const ChangeTheme: FC = () => {
  const currentTheme = useAppSelector(selectCurrentTheme);

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(changeTheme(currentTheme === 'dark' ? 'light' : 'dark'));
  };

  return <Button onClick={toggleTheme}>Сменить тему</Button>;
};
