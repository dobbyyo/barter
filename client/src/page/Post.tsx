import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useSeePostQuery } from '../generated/graphql';

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 1300px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Left = styled.div`
  width: 50%;
  max-width: 650px;
`;

const PostImg = styled.img`
  min-width: 50%;
`;

const Right = styled.div`
  width: 50%;
`;

const Post = () => {
  const { id } = useParams();

  const { data } = useSeePostQuery({ variables: { id: Number(id) } });

  return (
    <Container>
      <Wrapper>
        <Left>
          <PostImg src={data?.seePost.post?.file} />
        </Left>
        <Right>
          <h1>{data?.seePost.post?.title}</h1>
          <h1>{data?.seePost.post?.caption}</h1>
          <h1>{data?.seePost.post?.category}</h1>
          <h1>{data?.seePost.post?.title}</h1>
          <h1>{data?.seePost.post?.title}</h1>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Post;
