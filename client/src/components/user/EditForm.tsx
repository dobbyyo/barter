import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { MeQuery, useEditProfileMutation } from '../../generated/graphql';
import AuthLayout from '../auth/AuthLayout';
import FormBox from '../auth/FormBox';
import FormError from '../auth/FormError';
import FormOption from '../auth/FormOption';
import { Button, Input } from '../shared';

interface Props {
  userData: MeQuery | undefined;
}

const Label = styled.label`
  width: 100%;
  margin-top: 20px;
  padding: 0 6px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 3px;
  color: ${(props) => props.theme.blue};
`;

const EditForm: FC<Props> = ({ userData }) => {
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      name: userData?.me.user?.name,
      username: userData?.me.user?.username,
      email: userData?.me.user?.email,
      bio: userData?.me.user?.bio,
      avatar: userData?.me.user?.avatar,
    },
  });

  const [editProfileMutation, { loading }] = useEditProfileMutation({});

  const onEditProfile = useCallback(() => {
    editProfileMutation();
  }, []);

  return (
    <AuthLayout>
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faDice} size="3x" />
        </div>
        <form onSubmit={onEditProfile}>
          <Label id="name">이름</Label>
          <Input type="text" placeholder="이름" {...register('name', { required: '이름을 입력해주세요' })} />
          <FormError message={errors?.name?.message} />

          <Label id="username">유저네임</Label>
          <Input type="text" placeholder="유저네임" {...register('username', { required: '이름을 입력해주세요' })} />
          <FormError message={errors?.username?.message} />

          <Label id="email">이메일</Label>
          <Input type="email" placeholder="이메일" {...register('email', { required: '이름을 입력해주세요' })} />
          <FormError message={errors?.email?.message} />

          <Label id="bio">성별</Label>
          <FormOption register={register} name="bio" options={['남자', '여자']} />
          <FormError message={errors?.bio?.message} />

          <Label id="name">아바타</Label>
          <Input type="file" accept="image/*" {...register('avatar')} />
          <FormError message={errors?.avatar?.message} />

          <Button type="submit" value={loading ? '로딩...' : '편집'} disabled={!isValid || loading} />
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default EditForm;
