import { useReactiveVar } from '@apollo/client';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isLoggedInVar, logUserOut } from '../apollo';
import { useMeQuery } from '../generated/graphql';

const LoginUser = () => {
  const navigate = useNavigate();

  const hasToken = useReactiveVar(isLoggedInVar);
  // const { data, error } = useQuery<Query>(ME_QUERY, {
  //   skip: !hasToken,
  // });

  const { data, error } = useMeQuery({ skip: !hasToken });

  useEffect(() => {
    if (data?.me === null && !error) {
      logUserOut(navigate);
    }
  }, [data]);
  return { data };
};

export default LoginUser;
