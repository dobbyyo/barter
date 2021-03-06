import React, { useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';
import { gql, useMutation, useReactiveVar } from '@apollo/client';
import { useLocation, useNavigate } from 'react-router-dom';

import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import Separator from '../components/auth/Separator';
import { Button, Input, Interval } from '../components/shared';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import PageTitle from '../components/PageTitle';
import FormError from '../components/auth/FormError';
import { Mutation, MutationLoginArgs } from '../generated/graphql';
import { isLoggedInVar, logInUser } from '../apollo';

const NaverLogin = styled.div`
  color: #00ff0c;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const Notification = styled.div`
  color: ${(props) => props.theme.red};
  margin-top: 10px;
`;

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      token
      error
    }
  }
`;

interface LoginState {
  email?: string;
  password?: string;
  message?: string;
  result?: string;
}

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  const state = location.state as LoginState | null;

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/home/1');
    }
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isValid },
  } = useForm<LoginState>({
    mode: 'onChange',
    defaultValues: {
      email: state?.email || '',
      password: state?.password || '',
      message: state?.message || '',
    },
  });

  const [loginMutation, { loading }] = useMutation<Mutation, MutationLoginArgs>(LOGIN_MUTATION, {
    onCompleted: (data) => {
      const {
        login: { success, error, token },
      } = data;
      if (!success && error) {
        setError('result', {
          message: error,
        });
      }
      if (success && token) {
        logInUser(token);
        navigate('/home/1');
      }
    },
  });

  const onSubmitInvalid = () => {
    if (loading) {
      return null;
    }
    const { email, password } = getValues();

    const ok = email && password;
    return ok && loginMutation({ variables: { email, password } });
  };

  return (
    <AuthLayout>
      <PageTitle title="Login" />
      <Interval />

      <FormBox>
        <div>
          <FontAwesomeIcon icon={faDice} size="3x" />
        </div>
        <Notification>{state && state.message}</Notification>
        <form onSubmit={handleSubmit(onSubmitInvalid)}>
          <Input
            type="email"
            placeholder="?????????"
            {...register('email', {
              required: '???????????? ??????????????????',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />
          <Input
            type="password"
            placeholder="????????????"
            {...register('password', {
              required: '??????????????? ??????????????????',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />

          <Button type="submit" value={loading ? '??????...' : '?????????'} disabled={!isValid || loading} />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <NaverLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>????????? ?????????</span>
        </NaverLogin>
      </FormBox>
      <BottomBox
        linkTextOne="????????????"
        linkTextTwo="????????? ??????"
        linkTextThree="???????????? ??????"
        link1={routes.signUp}
        link2={routes.signUp}
        link3={routes.signUp}
      />
    </AuthLayout>
  );
};

export default Login;
