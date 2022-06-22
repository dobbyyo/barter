/* eslint-disable react/no-array-index-key */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';

import { Post, useAllPostsQuery } from '../generated/graphql';
import PostLayout from '../components/post/PostLayout';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 80px;
  align-items: center;
  max-width: 1200px;
  min-width: 1200px;
`;

const Title = styled.div`
  text-align: center;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    width: 40px;
    color: ${(props) => props.theme.red};
    border-bottom: 1px solid ${(props) => props.theme.red};
    margin-bottom: 10px;
    padding-bottom: 3px;
  }
  span {
    font-weight: 800;
    font-size: 25px;
  }
`;
const MoveWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 20px 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const MovePage = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
`;

const PageBtn = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};

  cursor: pointer;
  background-color: ${(props) => props.theme.bgColor};

  &:hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.bgColor};
  }
`;

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
