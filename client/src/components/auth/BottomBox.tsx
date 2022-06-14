import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BaseBox } from '../shared';

const SBottomBox = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  display: flex;
  justify-content: center;
  a {
    font-weight: 600;
    margin: 0 5px;
    color: ${(props) => props.theme.blue};
  }
`;
interface Props {
  linkTextOne: string;
  linkTextTwo: string;
  linkTextThree: string;
  link1: string;
  link2: string;
  link3: string;
}
const BottomBox: FC<Props> = ({ linkTextTwo, linkTextOne, linkTextThree, link1, link2, link3 }) => {
  return (
    <SBottomBox>
      <Link to={link1}>{linkTextOne}</Link>
      <div>|</div>
      <Link to={link2}>{linkTextTwo}</Link>
      <div>|</div>
      <Link to={link3}>{linkTextThree}</Link>
    </SBottomBox>
  );
};

export default BottomBox;
