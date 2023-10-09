/* eslint-disable react-refresh/only-export-components */
import { useAppSelector } from '@shared/model';
import { selectCurrentTheme } from '@entities/theme';

import { ChangeTheme } from '@features/changeTheme';
import { withProviders } from '@app/provider';

import './styles/normalize.css';
import './styles/index.css';

const App = () => {
  const currentTheme = useAppSelector(selectCurrentTheme);

  return (
    <div
      className={`h-full w-full mx-auto py-2 
    ${currentTheme}`}
    >
      <ChangeTheme />
    </div>
  );
};

export default withProviders(<App />);
