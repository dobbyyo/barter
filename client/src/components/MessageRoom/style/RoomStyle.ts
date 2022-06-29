import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  width: 50%;
  margin: 0 10px;
  position: fixed;
  height: 60%;
  top: 36%;
  background-color: #f4f4f4;
  color: ${(props) => props.theme.fontColor};
  cursor: default;
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  .icon {
    display: flex;
    align-items: center;
  }
  .otherInfo {
    display: flex;
    align-items: center;
    margin-left: 40%;
    h1 {
      margin-left: 10px;
    }
  }
`;

export const Author = styled.div<{ place: boolean }>`
  display: ${(props) => (props.place ? 'none' : 'flex')};
  align-items: center;
`;

export const Username = styled.div`
  margin-left: 5px;
`;
export const MessageWrapper = styled.div<{ place: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.place ? 'end' : 'start')};
  padding: 10px;
`;

export const Message = styled.div`
  display: flex;
  background-color: yellowgreen;
  border-radius: 10px;
  margin-left: 20px;
  height: 20px;
  align-items: center;
  padding: 5px 10px;
`;

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  position: relative;
`;

export const TextInput = styled.input`
  margin-bottom: 10px;
  width: 80%;
  background-color: white;
  padding: 10px 20px;
  border-radius: 1000px;
`;
export const Btn = styled.input`
  position: absolute;
  background-color: #000;
  color: #fff;
  padding: 5px;
  font-size: 8px;
  right: 9%;
  bottom: 10%;
  border-radius: 50%;
`;
