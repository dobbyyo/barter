/* eslint-disable react/jsx-boolean-value */
import { gql, useApolloClient } from '@apollo/client';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  MeQuery,
  RoomUpdatesDocument,
  useReadMessageMutation,
  useSeeRoomQuery,
  useSendMessageMutation,
} from '../../generated/graphql';

import Avatar from '../Avatar';
import {
  Author,
  Btn,
  Form,
  IconWrapper,
  Message,
  MessageContainer,
  MessageInfo,
  MessageWrapper,
  TextInput,
  Username,
  Wrapper,
} from './style/RoomStyle';

interface Props {
  id: number | undefined;
  meData: MeQuery | undefined;

  onMoveRoom: () => void;
}

const Room: FC<Props> = ({ id, meData, onMoveRoom }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();

  const { data, subscribeToMore } = useSeeRoomQuery({
    variables: { id: Number(id) },
  });

  const otherUser = data?.seeRoom.room?.message?.find((v: any) => v?.user.username !== meData?.me.user?.username)?.user;

  const [MutationSendMessage, { loading: sendMessageLoading }] = useSendMessageMutation({
    update(cache, { data: sendMessageData }) {
      const success = sendMessageData?.sendMessage.success;
      const newMessageId = sendMessageData?.sendMessage.id;

      if (success && newMessageId && meData) {
        const { payload } = getValues();
        setValue('payload', '');
        const messageObj = {
          __typename: 'Message',
          createdAt: `${Date.now()} ${''}`,
          id: newMessageId,
          payload,
          read: true,
          user: {
            username: meData.me.user?.username,
            avatar: meData.me.user?.avatar,
          },
        };
        cache.modify({
          id: `Room:${id}`,
          fields: {
            message(prev) {
              return [messageObj, ...prev];
            },
          },
        });
      }
    },
  });

  const onValid = useCallback(() => {
    const { payload } = getValues();
    if (!sendMessageLoading) {
      MutationSendMessage({
        variables: {
          payload,
          roomId: id,
        },
      });
    }
  }, [MutationSendMessage, sendMessageLoading]);

  const client = useApolloClient();

  const updateQueryVoid = (prevQuery: any, options: any) => {
    console.log(prevQuery);
    console.log('____________________');
    console.log(options);
    const message = options.subscriptionData.data.roomUpdates;
    console.log(message);
    if (message.id) {
      const incomingMessage = client.cache.writeFragment({
        fragment: gql`
          fragment NewMessage on Message {
            id
            payload
            read
            user {
              username
              avatar
            }
          }
        `,
        data: message,
      });
      client.cache.modify({
        id: `Room:${id}`,
        fields: {
          message(prev) {
            const existingMessage = prev.find((aMessage: any) => aMessage.__ref === incomingMessage?.__ref);
            if (existingMessage) {
              return prev;
            }
            return [...prev, incomingMessage];
          },
        },
      });
    }
  };

  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    if (data?.seeRoom && !subscribed) {
      subscribeToMore({
        document: RoomUpdatesDocument,
        variables: {
          id: Number(id),
        },
        onError(error) {
          console.log(error);
        },
        updateQuery: updateQueryVoid as any,
      });
      setSubscribed(true);
    }
  }, [data, subscribed]);

  const [MutationReadMessage] = useReadMessageMutation({
    update(cache, { data: ReadData }) {
      const success = ReadData?.readMessage.success;
      if (success) {
        cache.modify({
          id: `Room:${id}`,
          fields: {
            unreadTotal() {
              return 0;
            },
          },
        });
      }
    },
  });

  useEffect(() => {
    MutationReadMessage({
      variables: { id: Number(id) },
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
            <Avatar url={otherUser?.avatar} email={otherUser?.email} mid />
            <h1>{otherUser?.username}</h1>
          </div>
        </IconWrapper>
        {data?.seeRoom.room?.message?.map((v) => (
          <MessageWrapper key={v?.id} place={v?.user.username === meData?.me.user?.username}>
            <MessageInfo>
              <Author key={v?.id} place={v?.user.username === meData?.me.user?.username}>
                <Avatar url={v?.user.avatar} email={v?.user.email} />
                <Username>{v?.user.username}</Username>
              </Author>
              <Message>{v?.payload}</Message>
            </MessageInfo>
          </MessageWrapper>
        ))}
      </Wrapper>
      <Form onSubmit={handleSubmit(onValid)}>
        <TextInput placeholder="메시지를 입력해주세요" {...register('payload')} />
        <Btn type="submit" value="확인" />
      </Form>
    </MessageContainer>
  );
};

export default Room;
