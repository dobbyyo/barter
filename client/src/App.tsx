/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { ApolloProvider, useReactiveVar } from '@apollo/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';

import { client, darkModeVar, isLoggedInVar } from './apollo';
import Home from './page/Home';
import Login from './page/Login';
import NotFound from './page/NotFound';
import routes from './routes';
import { darkTheme, GlobalStyles, whiteTheme } from './styles/styles';
import SignUp from './page/SignUp';
import Layout from './components/Layout';
import Post from './page/Post';
import UploadPost from './page/UploadPost';

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <ApolloProvider client={client}>
      <HelmetProvider>
        <ThemeProvider theme={darkMode ? whiteTheme : darkTheme}>
          <GlobalStyles />
          <BrowserRouter>
            <Routes>
              <Route
                path={routes.home}
                element={
                  <Layout>
                    <Home />
                  </Layout>
                }
              />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.signUp} element={<SignUp />} />
              <Route
                path={routes.post}
                element={
                  <Layout>
                    <Post />
                  </Layout>
                }
              />
              <Route
                path={routes.uploadPost}
                element={
                  <Layout>
                    <UploadPost />
                  </Layout>
                }
              />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </HelmetProvider>
    </ApolloProvider>
  );
}

export default App;
