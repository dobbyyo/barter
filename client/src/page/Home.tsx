import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { Post, useAllPostsQuery, useRandomPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';
import { Container, MarginDiv, Title, Wrapper } from './Style/CommonStyled/Wrapper';
import RandomLayout from '../components/post/RandomLayout';
import PageHook from '../hook/PageHook';
import PageTitle from '../components/PageTitle';

const RandomWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Home = () => {
  const { page } = useParams();

  const { data: AllPosts } = useAllPostsQuery({ variables: { page: Number(page) } });
  const { data: RandomPosts } = useRandomPostsQuery();

  const total = AllPosts?.allPosts.totalPages;

  return (
    <Wrapper>
      <PageTitle title="Home" />

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
      <PageHook total={total} page={page} name="home" />
    </Wrapper>
  );
};

export default Home;
