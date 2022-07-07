import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Room as RoomQuery } from '../../generated/graphql';
import LoginUser from '../../hook/loginUser';
import Avatar from '../Avatar';

interface Props {
  data: RoomQuery | undefined;
  onChange: () => void;
}

const RoomContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
  min-width: 330px;
  max-width: 400px;
  height: 40px;
  padding: 5px;
  margin-bottom: 6px;
`;

const Column = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-around;
  cursor: pointer;
`;

const Data = styled.div`
  display: flex;
  align-items: flex-start;
  width: 80%;
`;

const UnReadBox = styled.div`
  display: flex;
  align-items: center;
`;

const Username = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  font-size: 16px;
`;
const UnreadDot = styled.div`
  width: 30px;
  border-radius: 50%;
  height: 30px;
  background-color: ${(props) => props.theme.blue};
  position: relative;
`;
const UnreadText = styled.div`
  color: ${(props) => props.theme.red};
  font-weight: 600;
  font-size: 20px;
  position: absolute;
  right: 9px;
  bottom: 4px;
`;

const Rooms: FC<Props> = ({ data, onChange }) => {
  const { data: MeData } = LoginUser();

  const otherUser = data?.users && data.users.find((v) => v?.username !== MeData?.me.user?.username);

  const [read, setRead] = useState(false);

  const onRead = useCallback(() => {
    setRead(true);
  }, []);

  return (
    <RoomContainer onClick={onChange}>
      <Column>
        <Avatar url={otherUser?.avatar} email={otherUser?.email} />
        <Data>
          <Username>{otherUser?.username}</Username>
        </Data>
        <UnReadBox>
          <div>
            {data?.unreadTotal === 0 ? null : (
              <UnreadDot>{data && data.unreadTotal > 0 && <UnreadText>{data.unreadTotal}</UnreadText>}</UnreadDot>
            )}
          </div>
        </UnReadBox>
      </Column>
    </RoomContainer>
  );
};
export default Rooms;
