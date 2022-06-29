/* eslint-disable consistent-return */
/* eslint-disable react/jsx-boolean-value */
import { gql, useApolloClient, useMutation, useQuery, useSubscription } from '@apollo/client';
import { faBackspace } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { Maybe, MeQuery, User, useSeeRoomQuery, useSendMessageMutation } from '../../generated/graphql';
import roomUpdates from '../../gql/Subscription/subscription';
import Avatar from '../Avatar';
import {
  Author,
  Btn,
  Form,
  IconWrapper,
  Message,
  MessageContainer,
  MessageWrapper,
  TextInput,
  Username,
  Wrapper,
} from './style/RoomStyle';

interface Props {
  id: number;
  meData: MeQuery | undefined;
  otherUser: Maybe<User> | undefined;
  onMoveRoom: () => void;
}

const Room: FC<Props> = ({ id, meData, otherUser, onMoveRoom }) => {
  const { register, handleSubmit, getValues, setValue } = useForm();

  const { data, subscribeToMore } = useSeeRoomQuery({
    variables: { id },
  });

  const [MutationSendMessage, { loading }] = useSendMessageMutation({
    update(cache, result) {
      const success = result.data?.sendMessage.success;
      const newMessageId = result.data?.sendMessage.id;
      if (success && newMessageId) {
        const { payload } = getValues();
        setValue('message', '');
        const messageObj = {
          id,
          payload,
          user: {
            username: meData?.me.user?.username,
            avatar: meData?.me.user?.avatar,
          },
          read: true,
          __typename: 'Message',
        };
        const messageFragment = cache.writeFragment({
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
          data: messageObj,
        });
        // const newMessage = {
        //   __typename: 'Message',
        //   createdAt: `${Date.now()} ${''}`,
        //   id: result.data?.sendMessage.id,
        //   read: true,
        //   payload,
        //   user: {
        //     ...meData?.me,
        //   },
        // };
        cache.modify({
          id: `Room:${id}`,
          fields: {
            messages(prev) {
              return [...prev, messageFragment];
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

  const client = useApolloClient();

  const updateQuery = (prevQuery: any, options: any) => {
    console.log(options);
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
      return client.cache.modify({
        id: `Room:${id}`,
        fields: {
          messages(prev) {
            const existingMessage = prev.find((aMessage: any) => aMessage.__ref === messageFragment);
            if (existingMessage) {
              return prev;
            }
            return [...prev, messageFragment];
          },
        },
      });
    }
  };

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
