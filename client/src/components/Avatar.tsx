import React, { FC } from 'react';
import styled from 'styled-components';
import gravatar from 'gravatar';

const SAvatar = styled.div<{ large?: boolean }>`
  overflow: hidden;
  width: ${(props) => (props.large ? '160px' : '20px')};
  height: ${(props) => (props.large ? '160px' : '20px')};
  border-radius: ${(props) => (props.large ? '50px' : '15px')};
  margin-right: ${(props) => (props.large ? '150px' : '0')};
  margin-left: ${(props) => (props.large ? '50px' : '0')};
`;

const Img = styled.img`
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

interface Props {
  url: string | undefined | null;
  email: string | undefined | null;
  large?: boolean;
}
const Avatar: FC<Props> = ({ url, email, large }) => {
  return (
    <SAvatar large={large}>
      {url !== null ? <Img src={url} /> : email && <Img src={gravatar.url(email, { s: '100', d: 'retro' })} />}
    </SAvatar>
  );
};

export default Avatar;
