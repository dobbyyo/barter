/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostLayout from '../components/post/PostLayout';
import { Post, useCategoryPostQuery } from '../generated/graphql';
import { Container, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const Category = () => {
  const navigate = useNavigate();
  const { category, page } = useParams();
  console.log(category);
  const { data } = useCategoryPostQuery({ variables: { category: String(category), page: Number(page) } });
  console.log(data);

  const total = data?.categoryPost.totalPages;

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
        <h1>Category</h1>
        <span>{category} 게시글</span>
      </Title>
      <Container>
        {data?.categoryPost.posts?.map((post) => (
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

export default Category;
