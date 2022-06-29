/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-array-index-key */
import React, { useCallback, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { faDice, faMoon, faSearch, faSun } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar } from '../../apollo';
import LoginUser from '../../hook/loginUser';

import MoreBox from './MoreBox';
import Avatar from '../Avatar';
import UserMore from './UserMore';
import SearchBox from './SearchBox';
import SearchMore from './SearchMore';
import MakeArr from './MakeArr';

const Middle = styled.div<{ searchMoreBox: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 20px 45px;
  position: sticky;
  width: 100%;
  top: 0px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  z-index: 999;
  @media screen and (max-width: 768px) {
    justify-content: space-between;
    padding: 20px 10px;
  }
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  width: 33%;
  cursor: pointer;
  h1 {
    margin-left: 10px;
  }
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 33%;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;

const Bottom = styled.div<{ searchMoreBox: boolean }>`
  width: 100%;
  background-color: #000;
  display: flex;
  padding: 20px 3px;
  align-items: center;
  justify-content: space-around;
  color: ${(props) => props.theme.borderColor};
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
  @media screen and (max-width: 768px) {
    font-size: 8px;
  }
`;

const H1 = styled.div`
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  const { data } = LoginUser();

  const [moreBox, setMoreBox] = useState(false);
  const onOver = useCallback(() => {
    setMoreBox(true);
  }, []);
  const onLeave = useCallback(() => {
    setMoreBox(false);
  }, []);
  const onHome = useCallback(() => {
    navigate('/home/1');
  }, []);

  const [userMoreBox, setUserMoreBox] = useState(false);

  const onUserMoreBox = useCallback(() => {
    setUserMoreBox((cur) => !cur);
  }, []);
  const [searchMoreBox, setSearchMoreBox] = useState(false);
  const onSearchMoreBox = useCallback(() => {
    setSearchMoreBox((cur) => !cur);
  }, []);

  return (
    <>
      {searchMoreBox ? <SearchMore onSearchMoreBox={onSearchMoreBox} /> : null}
      <Middle searchMoreBox={searchMoreBox}>
        <Title onClick={onHome}>
          <FontAwesomeIcon icon={faDice} size="lg" />
          <h1>Barter</h1>
        </Title>

        <SearchBox />

        <IconsContainer>
          <Icon onClick={onSearchMoreBox}>
            <FontAwesomeIcon icon={faSearch} size="lg" className="searchI" />
          </Icon>
          <Icon>
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              size="lg"
              onClick={darkMode ? disableDarkMode : enableDarkMode}
            />
          </Icon>
          {data?.me.user && (
            <Icon onClick={onUserMoreBox}>
              <Avatar url={data?.me?.user?.avatar} email={data?.me.user?.email} />
            </Icon>
          )}
        </IconsContainer>

        {userMoreBox ? <UserMore isLoggedIn={isLoggedIn} onUserMoreBox={onUserMoreBox} loginUser={data} /> : null}
      </Middle>

      <Bottom searchMoreBox={searchMoreBox}>
        <div className="left" onMouseOver={onOver}>
          <h1>카테고리</h1>
        </div>
        <div className="right">
          <MakeArr />
          <H1 onMouseOver={onOver}>더보기</H1>
        </div>
      </Bottom>
      {moreBox && <MoreBox onMouseLeave={onLeave} />}
    </>
  );
};

export default Header;
