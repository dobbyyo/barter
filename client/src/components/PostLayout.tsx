import React, { FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faComment, faHeart, faPaperPlane } from '@fortawesome/free-regular-svg-icons';

import { BoldText } from './shared';
import Avatar from './Avatar';
import { Post } from '../generated/graphql';

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

interface Props {
  post: Post | any;
}

const PostLayout: FC<Props> = ({ post }) => {
  return (
    <PostsContainer>
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
  );
};

export default PostLayout;
