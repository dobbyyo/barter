import styled from 'styled-components';

export const MessageContainer = styled.div`
  display: flex;
  width: 100%;
  min-width: 330px;
  max-width: 400px;
  margin: 0 10px;
  height: 400px;
  color: ${(props) => props.theme.fontColor};
  position: relative;
  border: 3px solid ${(props) => props.theme.borderColor};
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  overflow: scroll;
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 10px;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  position: sticky;
  top: 0;
  background-color: ${(props) => props.theme.bgColor};
  .icon {
    display: flex;
    align-items: center;
    cursor: pointer;
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
  justify-content: center;
`;

export const Username = styled.div`
  margin-left: 5px;
`;
export const MessageWrapper = styled.div<{ place: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.place ? 'end' : 'start')};
  justify-content: center;
  padding: 10px;
`;

export const MessageInfo = styled.div`
  display: flex;
  height: 20px;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  display: flex;
  background-color: #03cf5b;
  border-radius: 10px;
  margin-left: 20px;
  height: 20px;
  align-items: center;
  padding: 5px 10px;
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  position: absolute;
`;

export const TextInput = styled.input`
  margin-bottom: 3px;
  width: 100%;
  background-color: white;
  padding: 10px 20px;
`;

export const Btn = styled.input`
  position: absolute;
  z-index: 99999;
  background-color: #000;
  color: #fff;
  bottom: 5px;
  padding: 5px;
  font-size: 8px;
  right: 2%;
  padding: 10px 10px;
  height: 10px;
  border-radius: 10px;
`;
