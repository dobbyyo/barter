import React, { FC } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

import { RandomPostsQuery } from '../../generated/graphql';
import { BoldText } from '../shared';
import Avatar from '../Avatar';

const Wrapper = styled.div`
  width: 90%;
  margin-left: 10px;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 5px;
  right: 30%;
  background-color: #4f4f4f;
  color: #fff;
  opacity: 0;
  border-radius: 12px;
  width: 100px;
  padding: 5px 10px;
`;
const PostsContainer = styled.div`
  background-color: initial;
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 280px;
  position: relative;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    ${Header} {
      opacity: 1;
    }
  }
`;
export const LinkWrapper = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
export const Username = styled(BoldText)`
  margin-left: 5px;
`;
export const PostFile = styled.img`
  width: 100%;
  border-radius: 50%;
`;

interface Props {
  post: RandomPostsQuery | undefined;
}
const RandomLayout: FC<Props> = ({ post }) => {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
  };
  const isDeskTop = useMediaQuery({ minWidth: 769 });
  if (!isDeskTop) {
    settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
    };
  }

  return (
    <Wrapper>
      <Slider {...settings}>
        {post?.randomPosts?.post?.map((v) => (
          <PostsContainer key={v?.id}>
            <Header>
              <LinkWrapper to={`/users/${v?.user.username}`}>
                <Avatar url={v?.user.avatar} email={v?.user.email} />
                <Username>{v?.user.username}</Username>
              </LinkWrapper>
            </Header>
            <PostFile src={v?.file} />
          </PostsContainer>
        ))}
      </Slider>
    </Wrapper>
  );
};

export default RandomLayout;
