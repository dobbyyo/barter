import React, { FC } from 'react';
import styled from 'styled-components';

export const SSelect = styled.select<{ hasError?: boolean }>`
  width: 100%;
  color: #000;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
  border: 0.5px solid ${(props) => (props.hasError ? props.theme.red : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  font-size: 10px;
  &::placeholder {
    font-size: 8px;
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

interface Props {
  register: any;
  options: string[];
  name: string;
}
const FormOption: FC<Props> = ({ register, options, name, ...rest }) => {
  return (
    <SSelect {...register(name)} {...rest}>
      {options.map((v: string) => (
        <option key={v} value={v}>
          {v}
        </option>
      ))}
    </SSelect>
  );
};

export default FormOption;
