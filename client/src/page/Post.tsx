/* eslint-disable react/no-array-index-key */
import React, { useCallback, useEffect, useState } from 'react';
import { faComment, faPaperPlane, faHeart as Heart, faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import Avatar from '../components/Avatar';
import { useDeletePostMutation, useSeePostQuery, useToggleLikeMutation } from '../generated/graphql';

import PostComment from '../components/post/PostComment';
import LoginUser from '../hook/loginUser';
import EditPost from '../components/post/PostEdit';
import useConfirm from '../hook/useConfirm';

const Container = styled.div<{ openEdit: boolean }>`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 100%;
  max-width: 100%;
  display: ${(props) => (props.openEdit ? 'none' : 'flex')};
`;

const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
`;

const Left = styled.div`
  width: 40%;
  max-width: 650px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 50px;
`;

const PostImg = styled.img`
  min-width: 400px;
`;

const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  width: 40%;
  min-width: 400px;

  .title {
    color: ${(props) => props.theme.blue};
    font-weight: 700;
    font-size: 20px;
    border-bottom: 1px solid ${(props) => props.theme.blue};
    margin: 10px 0;
    padding-bottom: 3px;
    text-align: center;
  }
  .caption {
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 16px;
    a {
      background-color: initial;
      color: ${(props) => props.theme.accent};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .category {
    font-size: 15px;
    font-weight: 400;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding: 5px 0;
    margin-bottom: 10px;
  }
`;

const UserI = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  span {
    margin-left: 10px;
  }
`;

const UserHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeI = styled.div`
  span {
    margin-left: 3px;
  }
`;
const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

const PostAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;

const Post = () => {
  const { id } = useParams();
  const [confirmData, setConfirmData] = useState(false);
  const ok = () => setConfirmData(true);
  const cancel = () => setConfirmData(false);
  const confirmDelete = useConfirm('삭제 하시겠습니까?', ok, cancel);

  const [openEdit, setOpenEdit] = useState(false);
  const onEditMove = useCallback(() => {
    setOpenEdit((prev) => !prev);
  }, []);

  const { data } = useSeePostQuery({ variables: { id: Number(id) } });
  const { data: userData } = LoginUser();

  const payload = data?.seePost.post?.caption as string;

  const [toggleLikeMutation] = useToggleLikeMutation({
    variables: { id: Number(id) },
    update(cache, result) {
      const isLiked = data?.seePost.post?.isLiked;

      if (result.data?.toggleLike.success) {
        cache.modify({
          id: `Post:${id}`,
          fields: {
            isLiked(prev) {
              return !prev;
            },
            likes(prev) {
              if (isLiked) {
                return prev - 1;
              }
              return prev + 1;
            },
          },
        });
      }
      if (result.data?.toggleLike.error) {
        alert(result.data?.toggleLike.error);
      }
    },
  });

  const onToggleLike = useCallback(() => {
    toggleLikeMutation();
  }, []);

  const [deletePostMutation] = useDeletePostMutation({
    update(cache, { data: deleteData }) {
      // if (deleteData?.deletePost.success === false) {
      //   return null;
      // }
      cache.evict({ id: `Post:${deleteData?.deletePost.id}` });
      cache.gc();
    },
  });

  const onDeletePost = useCallback(() => {
    if (confirmData) {
      deletePostMutation({
        variables: { id: Number(id) },
      });
    }
  }, [confirmData]);

  useEffect(() => {
    console.log(confirmData);
    if (confirmData) {
      onDeletePost();
      window.location.replace('/');
    }
  }, [confirmData]);

  return (
    <>
      {openEdit ? <EditPost userData={userData} post={data} /> : null}
      <Container openEdit={openEdit}>
        <Wrapper>
          <Left>
            <PostImg src={data?.seePost.post?.file} />
          </Left>
          <Right>
            <div>
              <UserI>
                <UserHeader>
                  <Avatar url={data?.seePost.post?.user.avatar} email={data?.seePost.post?.user.email} />
                  <span>{data?.seePost.post?.user.username}</span>
                </UserHeader>
                {userData?.me.user?.id === data?.seePost.post?.user.id && (
                  <UserHeader>
                    <FontAwesomeIcon icon={faX} size="lg" onClick={confirmDelete} />
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      size="lg"
                      style={{ marginLeft: '10px' }}
                      onClick={onEditMove}
                    />
                  </UserHeader>
                )}
              </UserI>
              <h1 className="title">{data?.seePost.post?.title}</h1>
              <h1 className="caption">
                {payload &&
                  payload.split(' ').map((word, index) =>
                    /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
                      <React.Fragment key={index}>
                        <Link to={`/hashtags/${word}`}> {word}</Link>{' '}
                      </React.Fragment>
                    ) : (
                      <React.Fragment key={index}>{word}</React.Fragment>
                    ),
                  )}
              </h1>
              <h1 className="category">카테고리: {data?.seePost.post?.category}</h1>
            </div>
            <div>
              <LikeI>
                <FontAwesomeIcon size="1x" icon={faHeart} style={{ color: 'red' }} />
                <span>{data?.seePost.post?.likes}</span>
              </LikeI>
            </div>
            <PostActions>
              <PostAction onClick={onToggleLike}>
                <FontAwesomeIcon
                  size="lg"
                  icon={data?.seePost.post?.isLiked ? faHeart : Heart}
                  style={{ color: data?.seePost.post?.isLiked ? 'red' : 'inherit' }}
                />
              </PostAction>
              <PostAction>
                <FontAwesomeIcon size="lg" icon={faComment} />
              </PostAction>
              <PostAction>
                <FontAwesomeIcon size="lg" icon={faPaperPlane} />
              </PostAction>
            </PostActions>
          </Right>
        </Wrapper>

        <PostComment data={data} id={Number(id)} />
      </Container>
    </>
  );
};

export default Post;