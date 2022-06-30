/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostLayout from '../components/post/PostLayout';
import { Post, useSeeFeedQuery } from '../generated/graphql';
import { Container, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const Feed = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const { data } = useSeeFeedQuery({ variables: { page: Number(page) } });
  console.log(data);
  const total = data?.seeFeed.totalPages;

  const arr = Array.from({ length: Number(total) }, () => 0);

  const onMovePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== Number(page)) {
        navigate(`/feed/${pageNumber}`);
      }
    },
    [page],
  );

  return (
    <Wrapper>
      <Title>
        <h1>Feed</h1>
        <span>Feed 게시글</span>
      </Title>
      <Container>
        {data?.seeFeed.post?.map((post) => (
          <PostLayout key={post?.id} post={post as Post} />
        ))}
      </Container>
      <MoveWrapper>
        {arr.map((v, i) => (
          <MovePage key={i}>
            <PageBtn onClick={() => onMovePage(i + 1)}>{i + 1}</PageBtn>
          </MovePage>
        ))}
      </MoveWrapper>
    </Wrapper>
  );
};

export default Feed;
