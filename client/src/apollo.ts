/* eslint-disable default-param-last */
import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
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
  window.location.replace('/home/1');
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

const uploadHttpLink = createUploadLink({
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    console.log(`GraphQL Error ${graphQLErrors}`);
  }
  if (networkError) {
    console.log(`Network Error ${networkError}`);
  }
});

export const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(uploadHttpLink),
  cache: new InMemoryCache({
    typePolicies: {
      User: {
        keyFields: (obj) => `User:${obj.username}`,
      },
      Query: {
        fields: {
          seeFollowers: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing) {
                console.log(existing.followers);
                const result = {
                  ...existing,
                  ...incoming,
                  followers: [...existing.followers, ...incoming.followers],
                };
                return result;
              }
              return incoming;
            },
          },
          seeFollowings: {
            keyArgs: false,
            merge(existing, incoming) {
              if (existing) {
                console.log(existing.followings);
                const result = {
                  ...existing,
                  ...incoming,
                  followings: [...existing.followings, ...incoming.followings],
                };
                return result;
              }
              return incoming;
            },
          },
        },
      },
    },
  }),
});
