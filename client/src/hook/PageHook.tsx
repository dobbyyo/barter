/* eslint-disable react/no-array-index-key */
import React, { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { MovePage, MoveWrapper, PageBtn } from '../page/Style/CommonStyled/Wrapper';

interface Props {
  total: number | undefined | null;
  page: string | undefined;
  name: string;
  hashtag?: string;
  title?: string;
  //   arr: [];
}
const PageHook: FC<Props> = ({ total, page, name, hashtag, title }) => {
  const navigate = useNavigate();
  const arr = Array.from({ length: Number(total) }, () => 0);

  let onMovePage = useCallback(
    (pageNumber: number) => {
      if (pageNumber !== Number(page)) {
        navigate(`/${name}/${pageNumber}`);
      }
    },
    [page],
  );
  if (name === 'hashtag') {
    onMovePage = useCallback(
      (pageNumber: number) => {
        if (pageNumber !== Number(page)) {
          navigate(`/hashtag/${hashtag}/${pageNumber}`);
        }
      },
      [page],
    );
  }
  if (name === 'title') {
    onMovePage = useCallback(
      (pageNumber: number) => {
        if (pageNumber !== Number(page)) {
          navigate(`/title/${title}/${pageNumber}`);
        }
      },
      [page],
    );
  }
  return (
    <MoveWrapper>
      {arr.map((v, i) => (
        <MovePage key={i}>
          <PageBtn onClick={() => onMovePage(i + 1)}>{i + 1}</PageBtn>
        </MovePage>
      ))}
    </MoveWrapper>
  );
};

export default PageHook;
