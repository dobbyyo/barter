import { gql, useQuery, useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../apollo';
import { Query } from '../generated/graphql';

const ME_QUERY = gql`
  query me {
    me {
      success
      error
      user {
        id
        username
        avatar
        email
      }
    }
  }
`;

const LoginUser = () => {
  const navigate = useNavigate();

  const hasToken = useReactiveVar(isLoggedInVar);
  const { data, error } = useQuery<Query>(ME_QUERY, {
    skip: !hasToken,
  });

  useEffect(() => {
    if (data?.me === null && !error) {
      logUserOut(navigate);
    }
  }, [data]);
  return { data };
};

export default LoginUser;
