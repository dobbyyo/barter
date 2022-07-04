import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BoldText } from '../../shared';

export const PostsContainer = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  max-width: 280px;
  position: relative;
  height: 450px;
`;

export const Header = styled.div`
  padding: 5px 10px;
  display: flex;
  align-items: center;
  height: 30px;
`;

export const Username = styled(BoldText)`
  margin-left: 5px;
`;
export const PostFile = styled.img`
  width: 100%;
  height: 290px;
`;
export const TopWrapper = styled.div`
  width: 100%;
  /* height: 200px; */
`;
export const PostData = styled.div`
  padding: 0 10px;
  height: 100px;
  margin-top: 3px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
  }
`;

export const PostAction = styled.div`
  margin-right: 10px;
`;

export const Likes = styled(BoldText)`
  margin-top: 15px;
  display: flex;
  justify-content: space-between;
`;
export const LinkWrapper = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 63%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  top: 7%;
  &:hover {
    opacity: 1;
  }
  .i {
    font-size: 30px;
  }
`;

export const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  cursor: pointer;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;
export const Title = styled.div`
  font-size: 16px;
  padding-bottom: 4px;
  h1 {
    margin-top: 4px;
    font-size: 12px;
    color: ${(props) => props.theme.accent};
  }
`;
