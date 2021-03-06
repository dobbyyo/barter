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
import Layout from './components/header/Layout';
import Post from './page/Post';
import UploadPost from './page/UploadPost';
import Profile from './page/Profile';
import Category from './page/Category';
import HashtagPost from './page/HashtagPosts';
import TitlePosts from './page/TitlePosts';
import MessageRoom from './page/MessageRoom';
import Feed from './page/Feed';

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
              <Route
                path={routes.profile}
                element={
                  <Layout>
                    <Profile />
                  </Layout>
                }
              />
              <Route
                path={routes.category}
                element={
                  <Layout>
                    <Category />
                  </Layout>
                }
              />
              <Route
                path={routes.hashtagPost}
                element={
                  <Layout>
                    <HashtagPost />
                  </Layout>
                }
              />
              <Route
                path={routes.feed}
                element={
                  <Layout>
                    <Feed />
                  </Layout>
                }
              />
              <Route
                path={routes.titlePost}
                element={
                  <Layout>
                    <TitlePosts />
                  </Layout>
                }
              />
              <Route
                path={routes.messageRoom}
                element={
                  <Layout>
                    <MessageRoom />
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
