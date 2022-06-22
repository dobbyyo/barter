/* eslint-disable react/jsx-boolean-value */
/* eslint-disable no-unneeded-ternary */
import { useReactiveVar } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import Avatar from '../components/Avatar';
import PageTitle from '../components/PageTitle';
import PostLayout from '../components/post/PostLayout';
import { BoldText, Btn } from '../components/shared';
import EditForm from '../components/user/EditForm';
import { Post, useFollowUserMutation, useSeeProfileQuery, useUnfollowUserMutation } from '../generated/graphql';
import LoginUser from '../hook/loginUser';

const Wrapper = styled.div`
  width: 100%;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(BoldText)`
  font-size: 18px;
`;
const Name = styled(BoldText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 80px;
  max-width: 1200px;
  min-width: 1200px;
  align-items: center;
`;

const ProfileBtn = styled(Btn)`
  height: 30px;
  margin-left: 10px;
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = LoginUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const { data: ProfileData, loading: ProfileLoading } = useSeeProfileQuery({
    variables: {
      username: String(username),
    },
  });
  const [followUserMutation] = useFollowUserMutation({
    update(cache, { data }) {
      if (data?.followUser.success === false) {
        return null;
      }
      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing(prev) {
            return true;
          },
          totalFollowers(prev) {
            return prev + 1;
          },
        },
      });
      return cache.modify({
        id: `User:${userData?.me.user?.username}`,
        fields: {
          totalFollowings(prev) {
            return prev + 1;
          },
        },
      });
    },
  });

  const [unFollowUserMutation] = useUnfollowUserMutation({
    update(cache, { data }) {
      if (data?.unfollowUser.success === false) {
        return null;
      }

      cache.modify({
        id: `User:${username}`,
        fields: {
          isFollowing(prev) {
            return false;
          },
          totalFollowers(prev) {
            return prev - 1;
          },
        },
      });
      return cache.modify({
        id: `User:${userData?.me.user?.username}`,
        fields: {
          totalFollowings(prev) {
            return prev - 1;
          },
        },
      });
    },
  });

  const arrPost = ProfileData?.seeProfile?.user?.posts;
  const seeUsername = ProfileData?.seeProfile.user?.username;

  const onFollow = useCallback(() => {
    followUserMutation({
      variables: { username: String(username) },
    });
  }, []);
  const onUnFollow = useCallback(() => {
    unFollowUserMutation({
      variables: { username: String(username) },
    });
  }, []);

  const [editUser, setEditUser] = useState(false);
  const onEdit = useCallback(() => {
    setEditUser((cur) => !cur);
  }, []);

  return (
    <Wrapper>
      {editUser && <EditForm userData={userData} />}
      {seeUsername && <PageTitle title={ProfileLoading ? 'Loading..' : `${seeUsername}의 프로필`} />}
      <Header>
        <Avatar url={ProfileData?.seeProfile?.user?.avatar} email={ProfileData?.seeProfile.user?.email} large={true} />
        <Column>
          <Row>
            {isLoggedIn && (
              <>
                <Username>{ProfileData?.seeProfile?.user?.username}</Username>
                {ProfileData?.seeProfile.user?.isMe && <ProfileBtn onClick={onEdit}>유저 수정</ProfileBtn>}
                {ProfileData?.seeProfile.user?.isFollowing ? (
                  <ProfileBtn onClick={onUnFollow}>언팔로워</ProfileBtn>
                ) : (
                  <ProfileBtn onClick={onFollow}>팔로워</ProfileBtn>
                )}
              </>
            )}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{ProfileData?.seeProfile?.user?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{ProfileData?.seeProfile?.user?.totalFollowings}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>{ProfileData?.seeProfile?.user?.name}</Name>
          </Row>
          <Row>{ProfileData?.seeProfile?.user?.bio}</Row>
        </Column>
      </Header>

      <Grid>{arrPost && arrPost.map((post) => <PostLayout key={post?.id} post={post as Post} />)}</Grid>
    </Wrapper>
  );
};

export default Profile;
