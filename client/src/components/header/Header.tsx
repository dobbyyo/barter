/* eslint-disable jsx-a11y/mouse-events-have-key-events */
/* eslint-disable react/no-array-index-key */

import React, { useCallback, useState } from 'react';
import { useReactiveVar } from '@apollo/client';
import styled from 'styled-components';
import { faDice, faHome, faMoon, faSearch, faSun, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { darkModeVar, disableDarkMode, enableDarkMode, isLoggedInVar, logUserOut } from '../../apollo';
import LoginUser from '../../hook/loginUser';
import routes from '../../routes';
import MoreBox from './MoreBox';
import Avatar from '../Avatar';

const Top = styled.div`
  display: flex;
  justify-content: end;
  padding: 0 40px;
  color: ${(props) => props.theme.bgColor};
  padding-top: 20px;
`;
const SHeader = styled.span`
  margin: 0 5px;
  font-size: 12px;
  color: ${(props) => props.theme.fontColor};
  opacity: 0.7;
  cursor: pointer;
`;

const Middle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 45px;
  position: sticky;
  top: 0px;
  color: ${(props) => props.theme.fontColor};
  background-color: ${(props) => props.theme.bgColor};
  z-index: 999;
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
  select {
    position: absolute;
    right: 30px;
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;
const Search = styled.input`
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  width: 300px;
`;

const Icon = styled.span`
  margin-left: 15px;
  cursor: pointer;
`;
const Bottom = styled.div`
  width: 100%;
  background-color: #000;
  display: flex;
  padding: 20px 0;
  align-items: center;
  justify-content: space-around;
  color: ${(props) => props.theme.bgColor};

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

const H1 = styled.div`
  cursor: pointer;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Header = () => {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);

  const { handleSubmit, getValues, register } = useForm();

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
    navigate('/home/1');
  }, []);
  const onUploadPost = useCallback(() => {
    navigate(routes.uploadPost);
  }, []);
  const onCategoryPosts = useCallback((id: number) => {
    navigate(`/category/${categoryArr[id]}/1`);
  }, []);

  const categoryArr = ['디저털기기', '생활가전', '가구_인테리어', '유야', '생활_가공식품'];

  const onSearch = useCallback(() => {
    const { keyword, option } = getValues();
    if (keyword.length === 0 || keyword.trim().length === 0) {
      alert('검색어를 입력해주세요');
    }
    if (option === '포스터') {
      navigate(`/title/${keyword}/1`);
    } else {
      navigate(`/users/${keyword}`);
    }
  }, [getValues]);

  return (
    // <Container>
    <>
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
          <form onSubmit={handleSubmit(onSearch)}>
            <Search
              placeholder="제목을 입력해주세요"
              {...register('keyword', { required: '제목/유저를 입력해주세요' })}
            />
            <FontAwesomeIcon icon={faSearch} size="lg" className="searchI" />
            <select {...register('option')}>
              <option value="포스터">포스터</option>
              <option value="유저">유저</option>
            </select>
          </form>
        </SearchWrapper>

        <IconsContainer>
          <Icon>
            <FontAwesomeIcon icon={faHome} size="lg" onClick={onHome} />
          </Icon>
          <Icon>
            <FontAwesomeIcon
              icon={darkMode ? faSun : faMoon}
              size="lg"
              onClick={darkMode ? disableDarkMode : enableDarkMode}
            />
          </Icon>

          {data?.me.user && (
            <Icon>
              <Link to={`/users/${data?.me.user?.username}`}>
                <Avatar url={data?.me?.user?.avatar} email={data?.me.user?.email} />
              </Link>
            </Icon>
          )}
          <Icon>
            <FontAwesomeIcon icon={faUpload} size="lg" onClick={onUploadPost} />
          </Icon>
        </IconsContainer>
      </Middle>

      <Bottom>
        <div className="left" onMouseOver={onOver}>
          <h1>카테고리+</h1>
        </div>
        <div className="right">
          {categoryArr.map((v, i) => (
            <H1 key={i} onClick={() => onCategoryPosts(i)}>
              {v}
            </H1>
          ))}
          <H1 onMouseOver={onOver}>더보기</H1>
        </div>
      </Bottom>
      {moreBox && <MoreBox onMouseLeave={onLeave} />}
    </>
    // </Container>
  );
};

export default Header;
