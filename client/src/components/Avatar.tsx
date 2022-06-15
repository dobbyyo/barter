import React, { FC } from 'react';
import styled from 'styled-components';
import gravatar from 'gravatar';

const SAvatar = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 15px;
  background-color: #2c2c2c;
  overflow: hidden;
`;

const Img = styled.img`
  max-width: 100%;
`;

interface Props {
  url: string | undefined | null;
  email: string | undefined | null;
}
const Avatar: FC<Props> = ({ url, email }) => {
  return (
    <SAvatar>
      {url !== null ? <Img src={url} /> : email && <Img src={gravatar.url(email, { s: '100', d: 'retro' })} />}
    </SAvatar>
  );
};

export default Avatar;
