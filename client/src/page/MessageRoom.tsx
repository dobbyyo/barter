import React, { useState } from 'react';
import styled from 'styled-components';
import Rooms from '../components/MessageRoom/Rooms';
import { Room as RoomQuery, useSeeRoomsQuery } from '../generated/graphql';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
`;

const Row = styled.div`
  width: 50%;
  border: 1px solid ${(props) => props.theme.borderColor};
  background-color: #f4f4f4;
  height: 400px;
  overflow: scroll;
`;
const Col = styled.div`
  display: flex;
  align-items: center;
  h1 {
    margin-left: 8px;
  }
`;

const MessageRoom = () => {
  const { data, loading } = useSeeRoomsQuery();

  return (
    <Container>
      <Row>{data && data.seeRooms.room?.map((v) => <Rooms data={v as RoomQuery} key={v?.id} />)}</Row>
    </Container>
  );
};

export default MessageRoom;
