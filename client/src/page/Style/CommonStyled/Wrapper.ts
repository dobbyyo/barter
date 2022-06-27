import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  padding: 20px 80px;
  align-items: center;
  max-width: 1200px;
  min-width: 1200px;
`;

export const Title = styled.div`
  text-align: center;
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  h1 {
    width: 100%;
    color: ${(props) => props.theme.red};
    border-bottom: 1px solid ${(props) => props.theme.red};
    margin-bottom: 10px;
    padding-bottom: 3px;
  }
  span {
    font-weight: 800;
    font-size: 25px;
  }
`;
export const MoveWrapper = styled.div`
  width: 100%;
  height: 50px;
  padding: 20px 0;
  margin-bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MovePage = styled.div`
  width: 30px;
  height: 30px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 2px;
`;

export const PageBtn = styled.button`
  width: 100%;
  height: 100%;
  border: 1px solid ${(props) => props.theme.borderColor};

  cursor: pointer;
  background-color: ${(props) => props.theme.bgColor};

  &:hover {
    background-color: ${(props) => props.theme.fontColor};
    color: ${(props) => props.theme.bgColor};
  }
`;
