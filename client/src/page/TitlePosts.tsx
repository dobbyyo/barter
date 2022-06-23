/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { Post, useSearchPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';
import { Container, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './CommonStyled/Wrapper';
import { ErrorSpan } from '../components/shared';

const TitlePosts = () => {
  const navigate = useNavigate();
  const { title, page } = useParams();

  const { data } = useSearchPostsQuery({ variables: { keyword: String(title), page: Number(page) } });

  const total = data?.searchPosts.totalPages;

  const arr = Array.from({ length: Number(total) }, () => 0);

  const onMovePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== Number(page)) {
        navigate(`/title/${title}/${pageNumber}`);
      }
    },
    [page],
  );

  return (
    <Wrapper>
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
          <MoveWrapper>
            {arr.map((v, i) => (
              <MovePage key={i}>
                <PageBtn onClick={() => onMovePage(i + 1)}>{i + 1}</PageBtn>
              </MovePage>
            ))}
          </MoveWrapper>
        </>
      )}
    </Wrapper>
  );
};

export default TitlePosts;
