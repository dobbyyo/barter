/* eslint-disable jsx-a11y/mouse-events-have-key-events */
import React, { useCallback, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { faDice, faHome, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar, logUserOut } from '../apollo';
import LoginUser from '../hook/loginUser';
import routes from '../routes';
import MoreBox from './MoreBox';
import Avatar from './Avatar';

const Container = styled.div`
  width: 100%;
  background-color: #f3f3f3;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding-top: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
  min-width: 100%;
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
`;
const Top = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 40px;
`;
const SHeader = styled.span`
  margin: 0 5px;
  font-size: 12px;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.7;
  cursor: pointer;
`;

const Middle = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 45px;
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  h1 {
    margin-left: 10px;
  }
`;

const SearchWrapper = styled.div`
  position: relative;
  .searchI {
    position: absolute;
    right: 0;
  }
`;
const Search = styled.input`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  width: 300px;
`;

const Icon = styled.span`
  margin-left: 15px;
`;
const Bottom = styled.div`
  width: 100%;
  background-color: #000;
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: space-around;
  h1 {
    cursor: pointer;
  }
  .left {
    width: 10%;
    text-align: center;
  }
  .right {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  const { data } = LoginUser();

  const onLogout = useCallback(() => {
    logUserOut(navigate);
  }, []);
  const onLogin = useCallback(() => {
    navigate(routes.login);
  }, []);
  const onJoin = useCallback(() => {
    navigate(routes.signUp);
  }, []);
  const [moreBox, setMoreBox] = useState(false);
  const onOver = useCallback(() => {
    setMoreBox(true);
  }, []);
  const onLeave = useCallback(() => {
    setMoreBox(false);
  }, []);
  const onHome = useCallback(() => {
    navigate(routes.home);
  }, []);

  return (
    <Container>
      <Wrapper>
        <Top>
          {isLoggedIn ? (
            <SHeader onClick={onLogout}>로그아웃</SHeader>
          ) : (
            <>
              <SHeader onClick={onLogin}>로그인</SHeader>
              <SHeader onClick={onJoin}>회원가입</SHeader>
            </>
          )}
          <SHeader>개발자</SHeader>
        </Top>

        <Middle>
          <Title onClick={onHome}>
            <FontAwesomeIcon icon={faDice} size="2x" />
            <h1>Barter</h1>
          </Title>

          <SearchWrapper>
            <Search placeholder="제목을 입력해주세요" />
            <FontAwesomeIcon icon={faSearch} size="lg" className="searchI" />
          </SearchWrapper>

          <IconsContainer>
            <Icon>
              <FontAwesomeIcon icon={faHome} size="lg" />
            </Icon>
            <Icon>
              <FontAwesomeIcon
                icon={darkMode ? faSun : faMoon}
                size="lg"
                onClick={darkMode ? disableDarkMode : enableDarkMode}
              />
            </Icon>
            <Icon>
              <Avatar url={data?.me?.user?.avatar} email={data?.me.user?.email} />
            </Icon>
          </IconsContainer>
        </Middle>

        <Bottom>
          <div className="left" onMouseOver={onOver}>
            <h1>카테고리+</h1>
          </div>
          <div className="right">
            <h1>디지털기기</h1>
            <h1>생활가전</h1>
            <h1>가구/인테리어</h1>
            <h1>유야</h1>
            <h1>생활/가공식품</h1>
            <h1>스포츠/래저</h1>
            <h1 onMouseOver={onOver}>더보기</h1>
          </div>
        </Bottom>
        {moreBox && <MoreBox onMouseLeave={onLeave} />}
      </Wrapper>
    </Container>
  );
};

export default Header;
