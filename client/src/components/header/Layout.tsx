import React, { FC } from 'react';
import styled from 'styled-components';
import Header from './Header';

interface Props {
  children: React.ReactNode;
}

const Content = styled.div``;

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
};

export default Layout;
