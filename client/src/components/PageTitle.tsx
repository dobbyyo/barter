import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

interface Props {
  title: string;
}

const PageTitle: FC<Props> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | Barter</title>
    </Helmet>
  );
};

export default PageTitle;
