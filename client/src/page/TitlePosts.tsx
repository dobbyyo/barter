import React from 'react';
import { useParams } from 'react-router-dom';

import { Post, useSearchPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';
import { Container, Title, Wrapper } from './Style/CommonStyled/Wrapper';
import { ErrorSpan } from '../components/shared';
import PageHook from '../hook/PageHook';
import PageTitle from '../components/PageTitle';

const TitlePosts = () => {
  const { title, page } = useParams();
  const { data } = useSearchPostsQuery({ variables: { keyword: String(title), page: Number(page) } });
  const total = data?.searchPosts.totalPages;

  return (
    <Wrapper>
      <PageTitle title="TitlePosts" />

      {data?.searchPosts.error ? (
        <ErrorSpan>{data.searchPosts.error}</ErrorSpan>
      ) : (
        <>
          <Title>
            <h1>Title</h1>
            <span>{title} 게시글</span>
          </Title>
          <Container>
            {data?.searchPosts.posts?.map((post) => (
              <PostLayout key={post?.id} post={post as Post} />
            ))}
          </Container>
          <PageHook total={total} page={page} name="title" title={title} />
        </>
      )}
    </Wrapper>
  );
};

export default TitlePosts;
