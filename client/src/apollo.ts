import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { NavigateFunction } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';

import routes from './routes';

const TOKEN = 'TOKEN';
const DARK_MODE = 'DARK_MODE';

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));
export const logInUser = (token: string) => {
  localStorage.setItem(TOKEN, token);
  isLoggedInVar(true);
};
export const logUserOut = (navigate: NavigateFunction) => {
  localStorage.removeItem(TOKEN);
  isLoggedInVar(false);
  navigate(routes.home, { replace: true });
};

export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));
export const disableDarkMode = () => {
  localStorage.setItem(DARK_MODE, 'disabled');
  darkModeVar(false);
};
export const enableDarkMode = () => {
  localStorage.setItem(DARK_MODE, 'enabled');
  darkModeVar(true);
};

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      token: localStorage.getItem(TOKEN),
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});