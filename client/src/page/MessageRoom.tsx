import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import Room from '../components/MessageRoom/Room';
import Rooms from '../components/MessageRoom/Rooms';
import { Room as RoomQuery, useSeeRoomsQuery } from '../generated/graphql';
import LoginUser from '../hook/loginUser';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const Row = styled.div`
  min-width: 330px;
  max-width: 400px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  height: 400px;
  background-color: ${(props) => props.theme.bgColor};
  border: 2px solid ${(props) => props.theme.borderColor};
  overflow: scroll;
`;

const Div = styled.div``;

const MessageRoom = () => {
  const { data: MeData } = LoginUser();

  const { data, loading } = useSeeRoomsQuery();
  const [openRoom, setOpenRoom] = useState(false);
  const [roomId, setRoomID] = useState<number>();
  const onConsole = useCallback(
    (id?: number) => {
      setRoomID(id);
    },
    [setRoomID],
  );

  const onChange = useCallback(() => {
    setOpenRoom((cur) => !cur);
  }, []);

  const onMoveRoom = useCallback(() => {
    setOpenRoom(false);
  }, []);
  return (
    <Container>
      {openRoom ? (
        <Room id={roomId} meData={MeData} onMoveRoom={onMoveRoom} />
      ) : (
        <Row>
          {data &&
            data.seeRooms.room?.map((v) => (
              <Div key={v?.id} onClick={() => onConsole(v?.id)}>
                <Rooms data={v as RoomQuery} onChange={onChange} />
              </Div>
            ))}
        </Row>
      )}
    </Container>
  );
};

export default MessageRoom;
