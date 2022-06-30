import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowUpFromBracket, faPodcast, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../../apollo';
import { MeQuery } from '../../generated/graphql';
import routes from '../../routes';

const Wrapper = styled.div`
  width: 100px;
  background-color: ${(props) => props.theme.bgColor};
  right: 20px;
  top: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  position: fixed;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 10px;
  padding-left: 10px;
`;
const Menu = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  cursor: pointer;
  h1 {
    margin-left: 10px;
  }
`;

interface Props {
  isLoggedIn: boolean;
  onUserMoreBox: () => void;
  loginUser: MeQuery | undefined;
}
const UserMore: FC<Props> = ({ isLoggedIn, onUserMoreBox, loginUser }) => {
  const navigate = useNavigate();
  const onUploadPost = useCallback(() => {
    navigate(routes.uploadPost);
    onUserMoreBox();
  }, []);
  const onLogin = useCallback(() => {
    navigate(routes.login);
    onUserMoreBox();
  }, []);
  const onJoin = useCallback(() => {
    navigate(routes.signUp);
    onUserMoreBox();
  }, []);
  const onLogout = useCallback(() => {
    logUserOut(navigate);
    onUserMoreBox();
  }, []);
  const onUser = useCallback(() => {
    navigate(`/users/${loginUser?.me.user?.username}`);
    onUserMoreBox();
  }, []);
  const onFeed = useCallback(() => {
    navigate('/feed/1');
    onUserMoreBox();
  }, []);

  return (
    <Wrapper>
      {isLoggedIn ? (
        <>
          <Menu onClick={onFeed}>
            <FontAwesomeIcon icon={faPodcast} size="lg" />
            <h1>피드</h1>
          </Menu>
          <Menu onClick={onUser}>
            <FontAwesomeIcon icon={faUser} size="lg" />
            <h1>프로필</h1>
          </Menu>
          <Menu onClick={onUploadPost}>
            <FontAwesomeIcon icon={faUpload} size="lg" />
            <h1>업로드</h1>
          </Menu>
          <Menu onClick={onLogout}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
            <h1>로그아웃</h1>
          </Menu>
        </>
      ) : (
        <>
          <Menu onClick={onLogin}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
            <h1>로그인</h1>
          </Menu>
          <Menu onClick={onJoin}>
            <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
            <h1>회원가입</h1>
          </Menu>
        </>
      )}
    </Wrapper>
  );
};

export default UserMore;
