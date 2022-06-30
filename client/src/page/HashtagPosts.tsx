import React, { useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PostLayout from '../components/post/PostLayout';
import { Post, useSeeHashtagQuery } from '../generated/graphql';
import { Container, MovePage, MoveWrapper, PageBtn, Title, Wrapper } from './Style/CommonStyled/Wrapper';

const HashtagPost = () => {
  const navigate = useNavigate();
  const { hashtag, page } = useParams();
  console.log(hashtag);
  const { data } = useSeeHashtagQuery({ variables: { keyword: `#${String(hashtag)}`, page: Number(page) } });
  console.log(data);

  const total = data?.seeHashtag.totalPages;

  const arr = Array.from({ length: Number(total) }, () => 0);

  const onMovePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== Number(page)) {
        navigate(`/hashtag/${hashtag}/${pageNumber}`);
      }
    },
    [page],
  );

  return (
    <Wrapper>
      <Title>
        <h1>Hashtag</h1>
        <span>해시태그 #{hashtag} 게시글</span>
      </Title>
      <Container>
        {data?.seeHashtag.posts?.map((post) => (
          <PostLayout key={post?.id} post={post as Post} />
        ))}
      </Container>
      <MoveWrapper>
        {arr.map((v, i) => (
          <MovePage key={v}>
            <PageBtn onClick={() => onMovePage(i + 1)}>{i + 1}</PageBtn>
          </MovePage>
        ))}
      </MoveWrapper>
    </Wrapper>
  );
};

export default HashtagPost;
