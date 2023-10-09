import { WithRouter } from './withRouter';
import { WithStore } from './withStore';

export const withProviders = (component: React.ReactNode) => {
  return WithRouter(WithStore(component));
};
