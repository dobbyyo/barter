import React, { FC } from 'react';
import styled from 'styled-components';
import { User } from '../../generated/graphql';
import Avatar from '../Avatar';

const Box = styled.div`
  padding: 10px 0;
  width: 40%;
  display: flex;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  align-items: center;
  justify-content: start;
`;
const Username = styled.div`
  margin: 0 20px;
`;

interface Props {
  data: User | undefined;
}
const FollowLayout: FC<Props> = ({ data }) => {
  return (
    <Box key={data?.id}>
      <Avatar url={data?.avatar} email={data?.email} />
      <Username>{data?.username}</Username>
    </Box>
  );
};

export default FollowLayout;
