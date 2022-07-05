import { useReactiveVar } from '@apollo/client';
import React, { useCallback, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { useMediaQuery } from 'react-responsive';

import { isLoggedInVar } from '../apollo';
import Avatar from '../components/Avatar';
import PageTitle from '../components/PageTitle';
import PostLayout from '../components/post/PostLayout';
import { BoldText, Btn, ErrorSpan } from '../components/shared';
import EditForm from '../components/user/EditForm';
import { Post, useFollowUserMutation, useSeeProfileQuery, useUnfollowUserMutation } from '../generated/graphql';
import LoginUser from '../hook/loginUser';
import FollowLayout from '../components/user/FollowLayout';
import routes from '../routes';

const Wrapper = styled.div<{ editUser: boolean }>`
  width: 100%;
  margin-top: 50px;
  display: ${(props) => (props.editUser ? 'none' : 'display')};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: 15px;
  }
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 768px) {
    font-size: 12px;
    margin-top: 20px;
    justify-content: center;
  }
`;
const List = styled.ul`
  display: flex;
  @media screen and (max-width: 768px) {
    justify-content: space-around;
    align-items: center;
  }
`;
const Item = styled.li`
  margin-right: 20px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    margin-right: 12px;
  }
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
  align-items: center;
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    padding: 0;
  }
`;

const ProfileBtn = styled(Btn)`
  height: 30px;
  margin-left: 10px;
  @media screen and (max-width: 768px) {
    width: 60px;
  }
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = LoginUser();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const navigate = useNavigate();
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
          isFollowing() {
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
          isFollowing() {
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

  const [followers, setFollowers] = useState(false);
  const [following, setFollowing] = useState(false);

  const onFollowers = useCallback(() => {
    setFollowers((prev) => !prev);
    setFollowing(false);
  }, []);
  const onFollowing = useCallback(() => {
    setFollowing((prev) => !prev);
    setFollowers(false);
  }, []);

  const onMoveMessage = useCallback(() => {
    navigate(routes.messageRoom, {
      state: {
        username,
      },
    });
  }, []);
  const isDeskTop = useMediaQuery({ minWidth: 769 });

  return (
    <>
      {editUser && <EditForm userData={userData} />}
      {seeUsername ? (
        <Wrapper editUser={editUser}>
          {seeUsername && <PageTitle title={ProfileLoading ? 'Loading..' : `${seeUsername}의 프로필`} />}

          <Header>
            <Avatar
              url={ProfileData?.seeProfile?.user?.avatar}
              email={ProfileData?.seeProfile.user?.email}
              large={isDeskTop && true}
            />
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
                  <Item onClick={onFollowers}>
                    <span>
                      <Value>{ProfileData?.seeProfile?.user?.totalFollowers}</Value> 팔로워
                    </span>
                  </Item>
                  <Item onClick={onFollowing}>
                    <span>
                      <Value>{ProfileData?.seeProfile?.user?.totalFollowings}</Value> 팔로윙
                    </span>
                  </Item>
                  <Item>
                    <span>
                      <Value>{ProfileData?.seeProfile?.user?.totalPosts}</Value> 포스터
                    </span>
                  </Item>
                  <Item>
                    <span>
                      <FontAwesomeIcon size="lg" icon={faPaperPlane} onClick={onMoveMessage} />
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
          {(followers || following) && (
            <FollowLayout data={ProfileData} username={username} followers={followers} following={following} />
          )}

          <Grid>{arrPost && arrPost.map((post) => <PostLayout key={post?.id} post={post as Post} />)}</Grid>
        </Wrapper>
      ) : (
        <ErrorSpan>{ProfileData?.seeProfile.error}</ErrorSpan>
      )}
    </>
  );
};

export default Profile;
