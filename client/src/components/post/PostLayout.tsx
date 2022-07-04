/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as Heart } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import Avatar from '../Avatar';
import { Post, useToggleLikeMutation } from '../../generated/graphql';
import {
  Header,
  Icon,
  Icons,
  Likes,
  LinkWrapper,
  PostData,
  PostFile,
  PostsContainer,
  Title,
  TopWrapper,
  Username,
} from './style/PostLayoutStyle';

interface Props {
  post: Post;
}

const PostLayout = ({ post }: Props) => {
  const [toggleLikeMutation] = useToggleLikeMutation({
    variables: { id: Number(post.id) },
    update(cache, result) {
      const { isLiked } = post;

      if (result.data?.toggleLike.success) {
        cache.modify({
          id: `Post:${post.id}`,
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

  return (
    <PostsContainer>
      <TopWrapper>
        <Header>
          <LinkWrapper to={`/users/${post.user.username}`}>
            <Avatar url={post.user.avatar} email={post.user.email} />
            <Username>{post.user.username}</Username>
          </LinkWrapper>
        </Header>
        <PostFile src={post.file} />
        <Icons>
          <Icon>
            <FontAwesomeIcon
              icon={post.isLiked ? faHeart : Heart}
              className="i"
              onClick={onToggleLike}
              style={{ color: post.isLiked ? 'red' : 'inherit' }}
            />
          </Icon>
        </Icons>
      </TopWrapper>
      <PostData>
        <Title>{post.title}</Title>
        <Title>
          {post.caption?.split(' ').map((word, index) =>
            /#[ㄱ-ㅎ|ㅏ-ㅣ|가-힣|\w]+/g.test(word) ? (
              <React.Fragment key={index}>
                <Link to={`/hashtag/${word.replace('#', '')}/1`}>
                  {' '}
                  <h1>{word}</h1>
                </Link>{' '}
              </React.Fragment>
            ) : (
              <React.Fragment key={index}>{word}</React.Fragment>
            ),
          )}
        </Title>
        <Likes>
          <span>{post.likes === 1 ? '1 like' : `${post.likes} likes`}</span>
          <Link to={`/post/${post.id}`}>
            <span>더보기</span>
          </Link>
        </Likes>
      </PostData>
    </PostsContainer>
  );
};

export default PostLayout;
