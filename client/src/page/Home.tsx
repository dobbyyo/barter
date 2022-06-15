import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { BoldText } from '../components/shared';
import { useAllPostsQuery } from '../generated/graphql';
import Avatar from '../components/Avatar';

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 80px;
`;

const PostsContainer = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 280px;
`;

const Header = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
`;

const Username = styled(BoldText)`
  margin-left: 5px;
`;

const PostFile = styled.img`
  min-width: 100%;
`;

const PostData = styled.div`
  padding: 15px;
`;

const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

const PostAction = styled.div`
  margin-right: 10px;
`;

const Likes = styled(BoldText)`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
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

const Home = () => {
  const { data } = useAllPostsQuery({ variables: { page: 1 } });

  const total = data?.allPosts.totalPages;

  const arr = Array.from({ length: Number(total) }, () => 0);

  return (
    <>
      <Title>
        <h1>New</h1>
        <span>Barter 게시글</span>
      </Title>
      <Container>
        {data?.allPosts.post?.map((post) => (
          <PostsContainer key={post?.id}>
            <Header>
              <Avatar url={post?.user.avatar} email={post?.user.email} />
              <Username>{post?.user.username}</Username>
            </Header>
            <PostFile src={post?.file} />
            <PostData>
              <PostActions>
                <div>
                  <PostAction>
                    <FontAwesomeIcon size="1x" icon={faHeart} />
                  </PostAction>
                  <PostAction>
                    <FontAwesomeIcon size="1x" icon={faComment} />
                  </PostAction>
                  <PostAction>
                    <FontAwesomeIcon size="1x" icon={faPaperPlane} />
                  </PostAction>
                </div>
                <div>
                  <FontAwesomeIcon size="1x" icon={faBookmark} />
                </div>
              </PostActions>
              <Likes>
                <span>{post?.likes === 1 ? '1 like' : `${post?.likes} likes`}</span>
                <Link to={`/post/${post?.id}`}>
                  <span>더보기</span>
                </Link>
              </Likes>
            </PostData>
          </PostsContainer>
        ))}
      </Container>
      <MoveWrapper>
        {arr.map((v, i) => (
          <MovePage key={v}>{i + 1}</MovePage>
        ))}
      </MoveWrapper>
    </>
  );
};

export default Home;
