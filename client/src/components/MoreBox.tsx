import React, { FC } from 'react';
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
  return (
    <Container onMouseLeave={onMouseLeave}>
      <Name>디지털기기</Name>
      <Name>생활가전</Name>
      <Name>가구/인테리어</Name>
      <Name>유야</Name>
      <Name>생활/가공식품</Name>
      <Name>스포츠/래저</Name>
      <Name>여성패션/잡화</Name>
      <Name>남성패션/잡화</Name>
      <Name>개임/취미</Name>
      <Name>뷰티/미용</Name>
      <Name>반려동물용품</Name>
      <Name>도서/티켓/음반</Name>
      <Name>식물</Name>
      <Name>기타 중고물품</Name>
    </Container>
  );
};

export default MoreBox;
