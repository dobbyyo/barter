import React, { FC, useCallback, useEffect, useState } from 'react';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { logUserOut } from '../../apollo';
import { MeQuery, useDeleteUserMutation, useEditProfileMutation } from '../../generated/graphql';
import { ME_QUERY } from '../../gql/Query/query';
import useConfirm from '../../hook/useConfirm';
import AuthLayout from '../auth/AuthLayout';
import FormBox from '../auth/FormBox';
import FormError from '../auth/FormError';
import FormOption from '../auth/FormOption';
import { Button, Input } from '../shared';

interface Props {
  userData: MeQuery | undefined;
}

const PostImg = styled.img`
  width: 50%;
  padding: 20px 0;
  border-radius: 50%;
`;

const Label = styled.label`
  width: 100%;
  margin-top: 20px;
  padding: 0 6px;
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 3px;
  color: ${(props) => props.theme.blue};
`;
const Menu = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  margin-top: 30px;
`;
const Btn = styled.div<{ Active: boolean }>`
  width: 100px;
  background-color: ${(props) => props.theme.fontColor};
  color: ${(props) => (props.Active ? props.theme.blue : props.theme.bgColor)};
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  margin: 0 10px;
  cursor: pointer;
  &:hover {
    opacity: 0.6;
  }
  @media screen and (max-width: 768px) {
    padding: 0;
    height: 30px;
    margin-top: 30px;
  }
`;

const EditForm: FC<Props> = ({ userData }) => {
  const [passwordActive, setPasswordActive] = useState(false);
  const [profileActive, setProfileActive] = useState(true);
  const navigate = useNavigate();
  const [confirmData, setConfirmData] = useState(false);
  const ok = () => setConfirmData(true);
  const cancel = () => setConfirmData(false);
  const confirmDelete = useConfirm('?????? ???????????????????', ok, cancel);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      name: userData?.me.user?.name,
      username: userData?.me.user?.username,
      email: userData?.me.user?.email,
      bio: userData?.me.user?.bio,
      avatar: userData?.me.user?.avatar ? userData?.me.user?.avatar : null,
      password: '',
    },
  });

  const watchingPostFile = watch('avatar');
  const [uri, setUri] = useState<string>('');

  useEffect(() => {
    const uuri = userData?.me.user?.avatar;
    if (uuri) {
      setUri(uuri);
    }

    if (watchingPostFile !== uuri && watchingPostFile) {
      const PostFile = watchingPostFile[0];
      const objectUrl: string = URL.createObjectURL(PostFile as any);
      setUri(objectUrl);
    }
  }, [watchingPostFile]);

  const onChangeActive = useCallback(() => {
    setPasswordActive((cur) => !cur);
    setProfileActive((cur) => !cur);
  }, []);
  const [editProfileMutation, { loading: editProfileLoading, data: editData }] = useEditProfileMutation({
    // eslint-disable-next-line consistent-return
    update(cache, { data }) {
      if (data?.editProfile.success === false && data.editProfile.error) {
        return null;
      }
      const { email, name, username, bio } = getValues();
      cache.modify({
        id: `User:${username}`,
        fields: {
          email: () => email,
          name: () => name,
          username: () => username,
          bio: () => bio,
          avatar: () => uri,
        },
      });
      return navigate(-1);
    },
    refetchQueries: [{ query: ME_QUERY }],
  });

  const onEditProfile = useCallback(() => {
    const { email, name, username, password, bio, avatar } = getValues();

    editProfileMutation({
      variables: {
        email,
        name,
        username,
        password: password === '' ? null : password,
        bio: bio === '' ? null : bio,
        avatar: avatar ? avatar[0] : undefined,
      },
    });
  }, []);

  const [deleteUserMutation, { loading: deleteUserLoading, data: deleteData }] = useDeleteUserMutation({
    update(cache, { data: deleteUserData }) {
      if (deleteUserData?.deleteUser.success === false) {
        return null;
      }

      cache.evict({ id: `User:${userData?.me.user?.username}` });
      return cache.gc();
    },
  });

  const onDeleteUser = useCallback(() => {
    const { email, password } = getValues();

    if (confirmData) {
      deleteUserMutation({
        variables: {
          email: email as string,
          password,
        },
      });
    }
  }, [confirmData]);

  useEffect(() => {
    if (confirmData) {
      onDeleteUser();
    }
  }, [confirmData]);

  useEffect(() => {
    if (deleteData?.deleteUser.success === true) {
      logUserOut(navigate);
    }
  }, [deleteData]);

  return (
    <AuthLayout>
      <Menu>
        <Btn Active={profileActive} onClick={onChangeActive}>
          ????????? ??????
        </Btn>
        <Btn Active={passwordActive} onClick={onChangeActive}>
          ????????????
        </Btn>
      </Menu>

      {profileActive ? (
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faDice} size="3x" />
          </div>
          <form onSubmit={handleSubmit(onEditProfile)}>
            <Label id="name">??????</Label>
            <Input type="text" placeholder="??????" {...register('name', { required: '????????? ??????????????????' })} />
            <FormError message={errors?.name?.message} />

            <Label id="username">????????????</Label>
            <Input type="text" placeholder="????????????" {...register('username', { required: '????????? ??????????????????' })} />
            <FormError message={errors?.username?.message} />

            <Label id="email">?????????</Label>
            <Input type="email" placeholder="?????????" {...register('email', { required: '????????? ??????????????????' })} />
            <FormError message={errors?.email?.message} />

            <Label id="password">????????????</Label>
            <Input type="password" placeholder="????????????" {...register('password')} />
            <FormError message={errors?.password?.message} />

            <Label id="bio">??????</Label>
            <FormOption register={register} name="bio" options={['??????', '??????']} />
            <FormError message={errors?.bio?.message} />

            <Label id="name">?????????</Label>
            <Input type="file" accept="image/*" {...register('avatar')} />
            <FormError message={errors?.avatar?.message} />

            {uri && <PostImg src={uri} alt="img" />}
            <Button
              type="submit"
              value={editProfileLoading ? '??????...' : '??????'}
              disabled={!isValid || editProfileLoading}
            />
            {editData?.editProfile.error && <FormError message={editData?.editProfile.error} />}
          </form>
        </FormBox>
      ) : (
        <FormBox>
          <div>
            <FontAwesomeIcon icon={faDice} size="3x" />
          </div>
          <form onSubmit={handleSubmit(onDeleteUser)}>
            <Label id="email">?????????</Label>
            <Input type="email" placeholder="?????????" {...register('email', { required: '????????? ??????????????????' })} />
            <FormError message={errors?.email?.message} />

            <Label id="password">????????????</Label>
            <Input
              type="password"
              placeholder="????????????"
              {...register('password', { required: '??????????????? ??????????????????' })}
            />
            <FormError message={errors?.password?.message} />

            <Button
              type="submit"
              value={deleteUserLoading ? '??????...' : '????????????'}
              disabled={!isValid || deleteUserLoading}
              onClick={confirmDelete}
            />
            {deleteData?.deleteUser.error && <FormError message={deleteData?.deleteUser.error} />}
          </form>
        </FormBox>
      )}
    </AuthLayout>
  );
};

export default EditForm;
