import styled from 'styled-components';

export const Container = styled.div<{ openEdit: boolean }>`
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-width: 100%;
  max-width: 100%;
  display: ${(props) => (props.openEdit ? 'none' : 'flex')};
`;

export const Wrapper = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
  padding: 20px 0;
`;

export const Left = styled.div`
  width: 40%;
  max-width: 650px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0 50px;
`;

export const PostImg = styled.img`
  min-width: 400px;
`;

export const Right = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  width: 40%;
  min-width: 400px;

  .title {
    color: ${(props) => props.theme.blue};
    font-weight: 700;
    font-size: 20px;
    border-bottom: 1px solid ${(props) => props.theme.blue};
    margin: 10px 0;
    padding-bottom: 3px;
    text-align: center;
  }
  .caption {
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 16px;
    a {
      background-color: initial;
      color: ${(props) => props.theme.accent};
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  .category {
    font-size: 15px;
    font-weight: 400;
    border-bottom: 1px solid ${(props) => props.theme.borderColor};
    padding: 5px 0;
    margin-bottom: 10px;
  }
`;

export const UserI = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 20px;
  span {
    margin-left: 10px;
  }
`;

export const UserHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const LikeI = styled.div`
  span {
    margin-left: 3px;
  }
`;
export const PostActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 20px;
  div {
    display: flex;
    align-items: center;
  }
  svg {
    font-size: 20px;
  }
`;

export const PostAction = styled.div`
  margin-right: 10px;
  cursor: pointer;
`;
