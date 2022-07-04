/* eslint-disable default-param-last */
import { ApolloClient, InMemoryCache, makeVar, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { createUploadLink } from 'apollo-upload-client';
import { NavigateFunction } from 'react-router-dom';
import { setContext } from '@apollo/client/link/context';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';

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
      Token: localStorage.getItem(TOKEN),
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

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
    connectionParams: () => ({
      Token: localStorage.getItem(TOKEN),
    }),
  },
});

// const wsLink = new WebSocketLink(
//   new SubscriptionClient('ws://localhost:4000/graphql', {
//     connectionParams: {
//       authToken: localStorage.getItem(TOKEN),
//     },
//   }),
// );
const httpLinks = authLink.concat(errorLink).concat(uploadHttpLink);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
  },
  wsLink,
  httpLinks,
);

export const client = new ApolloClient({
  link: splitLink,
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
      Subscription: {
        fields: {
          seeRoom: {
            merge(existing, incoming) {
              if (existing) {
                const result = {
                  ...existing,
                  ...incoming,
                  message: [...existing.message, ...incoming.message],
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
