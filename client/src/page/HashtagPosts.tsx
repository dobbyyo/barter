import React from 'react';
import { useParams } from 'react-router-dom';
import PageTitle from '../components/PageTitle';
import PostLayout from '../components/post/PostLayout';
import { Post, useSeeHashtagQuery } from '../generated/graphql';
import PageHook from '../hook/PageHook';
import { Container, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const HashtagPost = () => {
  const { hashtag, page } = useParams();
  const { data } = useSeeHashtagQuery({ variables: { keyword: `#${String(hashtag)}`, page: Number(page) } });
  const total = data?.seeHashtag.totalPages;

  return (
    <Wrapper>
      <PageTitle title="Hashtag" />
      <Title>
        <h1>Hashtag</h1>
        <span>해시태그 #{hashtag} 게시글</span>
      </Title>
      <Container>
        {data?.seeHashtag.posts?.map((post) => (
          <PostLayout key={post?.id} post={post as Post} />
        ))}
      </Container>
      <PageHook total={total} page={page} name="hashtag" hashtag={hashtag} />
    </Wrapper>
  );
};

export default HashtagPost;
