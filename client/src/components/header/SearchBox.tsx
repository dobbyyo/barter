import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

export const SearchWrapper = styled.div`
  position: relative;
  width: 33%;
  background-color: ${(props) => props.theme.borderColor};
  border-radius: 20px;
  padding: 10px 0;
  @media screen and (max-width: 768px) {
    display: none;
  }
  form {
    padding-left: 80px;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .searchI {
    position: absolute;
    right: 0;
    font-size: 18px;
    background-color: red;
    color: ${(props) => props.theme.bgColor};
    padding: 10px 0;
    border-radius: 20px;
    width: 40px;
  }
  select {
    position: absolute;
    left: 0;
    border-radius: 20px;
    padding: 10px 0;
    border: none;
    background-color: initial;
    padding: 0 10px;
  }
`;
export const Search = styled.input`
  width: 100%;
  padding: 0 10px;
`;

const SearchBox = () => {
  const { handleSubmit, getValues, register } = useForm();
  const navigate = useNavigate();

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
    <SearchWrapper>
      <form onSubmit={handleSubmit(onSearch)}>
        <div>|</div>
        <Search placeholder="제목을 입력해주세요" {...register('keyword', { required: '제목/유저를 입력해주세요' })} />
        <FontAwesomeIcon icon={faSearch} size="lg" className="searchI" />
        <select {...register('option')}>
          <option value="포스터">포스터</option>
          <option value="유저">유저</option>
        </select>
      </form>
    </SearchWrapper>
  );
};

export default SearchBox;
