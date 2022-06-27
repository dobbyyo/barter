/* eslint-disable react/jsx-boolean-value */
import { gql, useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/client';

import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Maybe, MeQuery, User, useSeeRoomQuery, useSendMessageMutation } from '../../generated/graphql';
import roomUpdates from '../../gql/Subscription/subscription';
import Avatar from '../Avatar';

interface Props {
  id: number;
  meData: MeQuery | undefined;
  otherUser: Maybe<User> | undefined;
  onMoveRoom: () => void;
}

const MessageContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 10px;
  position: fixed;
  height: 60%;
  top: 36%;
  background-color: #f4f4f4;
  color: ${(props) => props.theme.fontColor};
  cursor: default;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  .icon {
    display: flex;
    align-items: center;
  }
  .otherInfo {
    display: flex;
    align-items: center;
    margin-left: 40%;
    h1 {
      margin-left: 10px;
    }
  }
`;

const Author = styled.div<{ place: boolean }>`
  display: ${(props) => (props.place ? 'none' : 'flex')};
  align-items: center;
`;

const Username = styled.div`
  margin-left: 5px;
`;
const MessageWrapper = styled.div<{ place: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.place ? 'end' : 'start')};
  padding: 10px;
`;

const Message = styled.div`
  display: flex;
  background-color: yellowgreen;
  border-radius: 10px;
  margin-left: 20px;
  height: 20px;
  align-items: center;
  padding: 5px 10px;
`;

const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

const TextInput = styled.input`
  margin-bottom: 10px;
  width: 80%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;
const Btn = styled.input`
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px;
  font-size: 8px;
  right: 9%;
  bottom: 10%;
  border-radius: 50%;
`;

const Room: FC<Props> = ({ id, meData, otherUser, onMoveRoom }) => {
  const { register, handleSubmit, getValues } = useForm({
    mode: 'onChange',
  });

  const client = useApolloClient();

  const updateQuery = (prevQuery: any, options: any) => {
    const {
      subscriptionData: {
        data: { roomUpdates: message },
      },
    } = options;
    if (message.id) {
      const messageFragment = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            user {
              username
              avatar
            }
            read
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${id}`,
        fields: {
          messages(prev) {
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

  const {
    data,
    loading: SeeRoomLoading,
    subscribeToMore,
  } = useSeeRoomQuery({
    variables: { id },
  });

  const [subscribed, setSubscribed] = useState(false);
  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      subscribeToMore({
        document: roomUpdates,
        variables: {
          id,
        },
        updateQuery: updateQuery as any,
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);

  const [MutationSendMessage, { loading }] = useSendMessageMutation({
    update(cache, result) {
      const { payload } = getValues();
      const success = result.data?.sendMessage.success;
      const newMessageId = result.data?.sendMessage.id;
      if (success && newMessageId) {
        const newMessage = {
          __typename: 'Message',
          createdAt: `${Date.now()} ${''}`,
          id: result.data?.sendMessage.id,
          read: true,
          payload,
          user: {
            ...meData?.me,
          },
        };
        cache.modify({
          id: `Room:${id}`,
          fields: {
            message(prev) {
              return [...prev, newMessage];
            },
          },
        });
      }
    },
  });

  const onSubmitMessage = useCallback(() => {
    if (loading) {
      return null;
    }

    const { payload } = getValues();
    return MutationSendMessage({
      variables: { payload, roomId: id },
    });
  }, []);

  return (
    <MessageContainer>
      <Wrapper>
        <IconWrapper>
          <div className="icon">
            <FontAwesomeIcon icon={faBackspace} onClick={onMoveRoom} />
          </div>
          <div className="otherInfo">
            <Avatar url={otherUser?.avatar} email={otherUser?.email} mid={true} />
            <h1>{otherUser?.username}</h1>
          </div>
        </IconWrapper>
        {data?.seeRoom.room?.message?.map((v) => (
          <MessageWrapper key={v?.id} place={v?.user.id === meData?.me.user?.id}>
            <Author key={v?.id} place={v?.user.id === meData?.me.user?.id}>
              <Avatar url={v?.user.avatar} email={v?.user.email} />
              <Username>{v?.user.username}</Username>
            </Author>
            <Message>{v?.payload}</Message>
          </MessageWrapper>
        ))}
        <Form onSubmit={handleSubmit(onSubmitMessage)}>
          <TextInput placeholder="메시지를 입력해주세요" {...register('payload')} />
          <Btn type="submit" value="확인" />
        </Form>
      </Wrapper>
    </MessageContainer>
  );
};

export default Room;
