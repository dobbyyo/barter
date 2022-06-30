import React, { useCallback } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const H1 = styled.div`
  cursor: pointer;
`;

const MakeArr = () => {
  const navigate = useNavigate();
  const isDeskTop = useMediaQuery({ minWidth: 769 });
  const DeskArr = ['디저털기기', '생활가전', '가구_인테리어', '유야', '생활_가공식품'];

  //   const isMobile = useMediaQuery({ maxWidth: 768 });
  const MobileArr = ['디저털기기', '생활가전', '가구_인테리어'];

  const onCategoryPosts = useCallback((v: string) => {
    navigate(`/category/${v}/1`);
  }, []);

  if (isDeskTop) {
    return (
      <Wrapper>
        {DeskArr.map((v) => (
          <H1 key={v} onClick={() => onCategoryPosts(v)}>
            <h1>{v}</h1>
          </H1>
        ))}
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {MobileArr.map((v) => (
        <H1 key={v} onClick={() => onCategoryPosts(v)}>
          {v}
        </H1>
      ))}
    </Wrapper>
  );
};

export default MakeArr;
