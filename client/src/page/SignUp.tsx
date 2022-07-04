import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { gql, useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import Separator from '../components/auth/Separator';
import { Button, Input, Interval } from '../components/shared';
import BottomBox from '../components/auth/BottomBox';
import routes from '../routes';
import PageTitle from '../components/PageTitle';
import FormError from '../components/auth/FormError';
import { Mutation, MutationJoinArgs } from '../generated/graphql';

const NaverLogin = styled.div`
  color: #00ff0c;
  span {
    margin-left: 10px;
    font-weight: 600;
  }
`;

const JOIN_MUTATION = gql`
  mutation join($email: String!, $name: String!, $password: String!, $username: String!) {
    join(email: $email, name: $name, password: $password, username: $username) {
      success
      error
    }
  }
`;

const SignUp = () => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const navigate = useNavigate();

  const [joinMutation, { loading }] = useMutation<Mutation, MutationJoinArgs>(JOIN_MUTATION, {
    onCompleted: (data) => {
      console.log(data);
      const {
        join: { success, error },
      } = data;
      const { email, password } = getValues();
      if (!success && error) {
        return setError('result', { message: error });
      }
      return navigate(routes.home, {
        state: {
          email,
          password,
          message: '회원가입에 성공하셨습니다. 로그인하세요.',
        },
      });
    },
  });

  const onSubmit = () => {
    const { email, password, username, name } = getValues();

    if (loading) {
      return null;
    }
    const ok = email && password && username && name;
    return ok && joinMutation({ variables: { email, password, username, name } });
  };

  return (
    <AuthLayout>
      <PageTitle title="회원가입" />
      <Interval />

      <FormBox>
        <div>
          <FontAwesomeIcon icon={faDice} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="이름"
            {...register('name', {
              required: '이름를 입력해주세요',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.name?.message)}
          />
          <FormError message={errors?.name?.message} />

          <Input
            type="text"
            placeholder="유저네임"
            {...register('username', {
              required: '유저네임를 입력해주세요',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.username?.message)}
          />
          <FormError message={errors?.username?.message} />

          <Input
            type="email"
            placeholder="이메일"
            {...register('email', {
              required: '이메일를 입력해주세요',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.email?.message)}
          />
          <FormError message={errors?.email?.message} />

          <Input
            type="password"
            placeholder="비밀번호"
            {...register('password', {
              required: '비밀번호를 입력해주세요',
              onChange() {
                clearErrors('result');
              },
            })}
            hasError={Boolean(errors?.password?.message)}
          />
          <FormError message={errors?.password?.message} />

          <Button type="submit" value={loading ? '로딩...' : '회원가입'} disabled={!isValid || loading} />
          <FormError message={errors?.result?.message} />
        </form>
        <Separator />
        <NaverLogin>
          <FontAwesomeIcon icon={faFacebookSquare} />
          <span>네이버 회원가입</span>
        </NaverLogin>
      </FormBox>
      <BottomBox
        linkTextOne="로그인"
        linkTextTwo="아이디 찾기"
        linkTextThree="비밀번호 찾기"
        link1={routes.login}
        link2={routes.signUp}
        link3={routes.signUp}
      />
    </AuthLayout>
  );
};

export default SignUp;
