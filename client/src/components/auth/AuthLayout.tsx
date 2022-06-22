import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  /* height: 200vh; */
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Wrapper = styled.div`
  max-width: 500px;
  width: 100%;
`;

interface Props {
  children: React.ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
    </Container>
  );
};

export default AuthLayout;
