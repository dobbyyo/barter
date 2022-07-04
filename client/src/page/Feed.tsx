import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PostLayout from '../components/post/PostLayout';
import { Post, useSeeFeedQuery } from '../generated/graphql';
import PageHook from '../hook/PageHook';
import { Container, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const Feed = () => {
  const { page } = useParams();
  const { data } = useSeeFeedQuery({ variables: { page: Number(page) } });
  const total = data?.seeFeed.totalPages;

  return (
    <Wrapper>
      <PageTitle title="Feed" />

      <Title>
        <h1>Feed</h1>
        <span>Feed 게시글</span>
      </Title>
      <Container>
        {data?.seeFeed.post?.map((post) => (
          <PostLayout key={post?.id} post={post as Post} />
        ))}
      </Container>
      <PageHook total={total} page={page} name="feed" />
    </Wrapper>
  );
};

export default Feed;
