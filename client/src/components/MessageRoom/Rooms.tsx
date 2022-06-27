import React, { FC, useCallback, useState } from 'react';
import styled from 'styled-components';
import { Room as RoomQuery } from '../../generated/graphql';
import LoginUser from '../../hook/loginUser';
import Avatar from '../Avatar';
import Room from './Room';

interface Props {
  data: RoomQuery;
}

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const RoomContainer = styled.div`
  width: 100%;
  /* max-width: 500px; */
  padding: 20px 10px;
  margin: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-top: 10px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Data = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-left: 5px;
`;

const UnReadBox = styled.div`
  display: flex;
  align-items: center;
`;

const UnreadDot = styled.div`
  width: 10px;
  border-radius: 5px;
  height: 10px;
  background-color: ${(props) => props.theme.blue};
`;
const Username = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-weight: 600;
  font-size: 16px;
`;
const UnreadText = styled.div`
  color: ${(props) => props.theme.fontColor};
  margin-top: 2px;
  font-weight: 500;
  margin-right: 10px;
`;

const Rooms: FC<Props> = ({ data }) => {
  const { data: MeData } = LoginUser();
  const otherUser = data.users && data.users.find((v) => v?.username !== MeData?.me.user?.username);

  const [openRoom, setOpenRoom] = useState(false);
  const onMoveRoom = useCallback(() => {
    setOpenRoom((cur) => !cur);
  }, []);

  return (
    <Wrapper>
      {openRoom ? (
        <Room id={data.id} meData={MeData} otherUser={otherUser} onMoveRoom={onMoveRoom} />
      ) : (
        <Wrapper onClick={onMoveRoom}>
          <RoomContainer>
            <Column>
              <Avatar url={otherUser?.avatar} email={otherUser?.email} />
              <Data>
                <Username>{otherUser?.username}</Username>
              </Data>
            </Column>
            <UnReadBox>
              <UnreadText>
                {data.unreadTotal}
                {data.unreadTotal >= 1 && '메시지'}
              </UnreadText>
              <div>{data.unreadTotal === 0 ? null : <UnreadDot />}</div>
            </UnReadBox>
          </RoomContainer>
        </Wrapper>
      )}
    </Wrapper>
  );
};

export default Rooms;
