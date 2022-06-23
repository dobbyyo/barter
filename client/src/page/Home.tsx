/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Post, useAllPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';
import { Container, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './CommonStyled/Wrapper';

const Home = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const { data } = useAllPostsQuery({ variables: { page: Number(page) } });

  const total = data?.allPosts.totalPages;

  const arr = Array.from({ length: Number(total) }, () => 0);

  const onMovePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== Number(page)) {
        navigate(`/home/${pageNumber}`);
      }
    },
    [page],
  );

  return (
    <Wrapper>
      <Title>
        <h1>New</h1>
        <span>Barter 게시글</span>
      </Title>
      <Container>
        {data?.allPosts.post?.map((post) => (
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

export default Home;
