import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PostLayout from '../components/post/PostLayout';
import { Post, useCategoryPostQuery } from '../generated/graphql';
import PageHook from '../hook/PageHook';
import { Container, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const Category = () => {
  const { category, page } = useParams();

  const { data } = useCategoryPostQuery({ variables: { category: String(category), page: Number(page) } });

  const total = data?.categoryPost.totalPages;

  return (
    <Wrapper>
      <PageTitle title={category as string} />

      <Title>
        <h1>Category</h1>
        <span>{category} 게시글</span>
      </Title>
      <Container>
        {data?.categoryPost.posts?.map((post) => (
          <PostLayout key={post?.id} post={post as Post} />
        ))}
      </Container>
      <PageHook total={total} page={page} name="category" />
    </Wrapper>
  );
};

export default Category;
