import React, { FC } from 'react';
import styled from 'styled-components';

const Error = styled.span`
  color: ${(props) => props.theme.red};
  font-weight: 600;
  font-size: 12px;
  margin: 5px 0px 10px 0px;
`;

interface Props {
  message?: string;
}

const FormError: FC<Props> = ({ message }) => {
  return message === '' || !message ? null : <Error>{message}</Error>;
};

export default FormError;
