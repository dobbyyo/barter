/* eslint-disable react/no-array-index-key */

import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  color: #000;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: repeat(4, 1fr);
  padding: 20px 0;
`;
const Name = styled.div`
  color: ${(props) => props.theme.fontColor};
  font-size: 16px;
  padding: 6px 0;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  cursor: pointer;
`;

interface Props {
  onMouseLeave: () => void;
}
const MoreBox: FC<Props> = ({ onMouseLeave }) => {
  const navigate = useNavigate();
  const categoryArr = [
    '디저털기기',
    '생활가전',
    '가구_인테리어',
    '유야',
    '생활_가공식품',
    '스포츠_래저',
    '여성패션_잡화',
    '남성패션_잡화',
    '개임_취미',
    '뷰티_미용',
    '반려동물용품',
    '도서_티켓_음반',
    '식물',
    '기타 중고물품',
  ];
  const onCategoryPosts = useCallback((id: number) => {
    navigate(`/category/${categoryArr[id]}/1`);
  }, []);
  return (
    <Container onMouseLeave={onMouseLeave}>
      {categoryArr.map((v, i) => (
        <Name key={i} onClick={() => onCategoryPosts(i)}>
          {v}
        </Name>
      ))}
    </Container>
  );
};

export default MoreBox;
