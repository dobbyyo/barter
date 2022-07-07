import React, { FC, useCallback, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styled from 'styled-components';
import { useSeeFollowersQuery, useSeeFollowingsQuery } from '../../generated/graphql';
import Avatar from '../Avatar';

const Box = styled.div`
  padding: 5px 10px;
  width: 250px;
  height: 250px;
  display: flex;
  flex-direction: column;
  position: absolute;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  right: 40%;
  background-color: ${(props) => props.theme.bgColor};
  overflow: scroll;
  border: 1px solid ${(props) => props.theme.fontColor};
  z-index: 999;
`;
const UserInfo = styled.div`
  display: flex;
  padding: 10px 0;
  align-items: center;
  width: 100%;
`;

const Username = styled.div`
  margin: 0 20px;
`;

interface Props {
  username: string | undefined;
  followers: boolean;
  following: boolean;
}
const FollowLayout: FC<Props> = ({ username, followers, following }) => {
  const { ref, inView } = useInView();
  const [toN, setToN] = useState(1);
  const [more, setMore] = useState(true);

  const {
    data: seeFollowingsData,
    fetchMore: seeFollowingsMore,
    loading: followingLoading,
  } = useSeeFollowingsQuery({
    variables: { username: String(username) },
  });
  const {
    data: seeFollowerData,
    fetchMore: seeFollowersMore,
    loading: followerLoading,
  } = useSeeFollowersQuery({
    variables: { username: String(username) },
  });

  const moreCall = useCallback(async (): Promise<void> => {
    let seeFollow = seeFollowerData?.seeFollowers.followers;
    let lastId = seeFollow && seeFollow[seeFollow.length - 1]?.id;
    let total = seeFollowerData?.seeFollowers.totalPages;
    if (followers) {
      seeFollow = seeFollowerData?.seeFollowers.followers;
      lastId = seeFollow && seeFollow[seeFollow.length - 1]?.id;
      total = seeFollowerData?.seeFollowers.totalPages;
    } else {
      seeFollow = seeFollowingsData?.seeFollowings?.followings;
      lastId = seeFollow && seeFollow[seeFollow.length - 1]?.id;
      total = seeFollowingsData?.seeFollowings?.totalPages;
    }

    if (total === toN) {
      setMore(false);
    }

    if (inView && !followerLoading && more && followers) {
      await seeFollowersMore({ variables: { lastId } });
      setToN((prev) => prev + 1);
    } else if (inView && !followingLoading && more && following) {
      await seeFollowingsMore({ variables: { lastId } });
      setToN((prev) => prev + 1);
    }
  }, [inView, followerLoading, followingLoading, followers, following]);

  useEffect(() => {
    moreCall();
  }, [inView, followerLoading, followingLoading, followers, following]);

  if (followers) {
    return (
      <Box>
        {seeFollowerData?.seeFollowers.followers?.map((v) => (
          <UserInfo key={v?.id}>
            <Avatar url={v?.avatar} email={v?.email} />
            <Username>{v?.username}</Username>
          </UserInfo>
        ))}

        <div ref={!followerLoading ? ref : undefined} style={{ marginBottom: '20px' }} />
      </Box>
    );
  }
  return (
    <Box>
      {seeFollowingsData?.seeFollowings?.followings?.map((v) => (
        <UserInfo key={v?.id}>
          <Avatar url={v?.avatar} email={v?.email} />
          <Username>{v?.username}</Username>
        </UserInfo>
      ))}

      <div ref={!followingLoading ? ref : undefined} style={{ marginBottom: '20px' }} />
    </Box>
  );
};

export default FollowLayout;
