import { Provider } from 'react-redux';
import { store } from '@app/store';

export const WithStore = (component: React.ReactNode) => {
  return <Provider store={store}>{component}</Provider>;
};