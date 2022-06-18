import styled from 'styled-components';

export const BoldText = styled.span`
  font-weight: 600;
`;

export const BoldLink = styled.a`
  font-weight: 600;
`;

export const BaseBox = styled.div`
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.borderColor};
  width: 100%;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  color: #000;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => (props.hasError ? props.theme.red : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? '0.2' : '1')};
  cursor: pointer;
`;

export const Btn = styled.div`
  border: none;
  background-color: ${(props) => props.theme.fontColor};
  color: ${(props) => props.theme.bgColor};
  width: 120px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
`;
