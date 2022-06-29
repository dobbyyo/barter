/* eslint-disable global-require */
/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Post, useAllPostsQuery, useRandomPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';
import { Container, MarginDiv, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './Style/CommonStyled/Wrapper';
import RandomLayout from '../components/post/RandomLayout';

const RandomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const navigate = useNavigate();
  const { page } = useParams();

  const { data: AllPosts } = useAllPostsQuery({ variables: { page: Number(page) } });
  const { data: RandomPosts } = useRandomPostsQuery();

  const total = AllPosts?.allPosts.totalPages;

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
      {page === '1' && (
        <>
          <Title>
            <h1>New</h1>
            <span>추천 게시글</span>
          </Title>
          <RandomWrapper>
            <RandomLayout post={RandomPosts} />
          </RandomWrapper>
          <MarginDiv />
        </>
      )}
      <Title>
        <h1>New</h1>
        <span>Barter 게시글</span>
      </Title>
      <Container>
        {AllPosts?.allPosts.post?.map((post) => (
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
