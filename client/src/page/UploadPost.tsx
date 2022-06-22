/* eslint-disable consistent-return */
import { useReactiveVar } from '@apollo/client';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { isLoggedInVar } from '../apollo';
import AuthLayout from '../components/auth/AuthLayout';
import FormBox from '../components/auth/FormBox';
import FormError from '../components/auth/FormError';
import FormOption from '../components/auth/FormOption';
import PageTitle from '../components/PageTitle';
import { Button, Input } from '../components/shared';
import { useUploadPostMutation } from '../generated/graphql';
import LoginUser from '../hook/loginUser';
import routes from '../routes';

const PostImg = styled.img`
  width: 80%;
  padding: 20px 0;
`;

const UploadPost = () => {
  const navigate = useNavigate();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data: userData } = LoginUser();

  useEffect(() => {
    if (isLoggedIn === false) {
      alert('로그인이 필요합니다.');
      navigate(routes.home);
    }
  }, [isLoggedIn]);

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    mode: 'onChange',
  });

  const watchingPhotoFile = watch('file');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [uploadPostMutation, { loading }] = useUploadPostMutation({
    update(cache, { data }) {
      if (data?.uploadPost.success === false) {
        return null;
      }
      if (data?.uploadPost.success && userData?.me) {
        const newPost = {
          __typename: 'Post',
          id: data?.uploadPost.Post?.id,
          file: data?.uploadPost.Post?.file,
          title: data?.uploadPost.Post?.title,
          caption: data?.uploadPost.Post?.caption,
          category: data?.uploadPost.Post?.category,
          user: {
            ...userData?.me,
          },
        };

        cache.modify({
          id: `Post:${userData?.me.user?.id}`,
          fields: {
            total: (total) => total + 1,
            Post(prev) {
              return [newPost, ...prev];
            },
          },
        });
        navigate(-1);
      }
    },
  });

  const onSubmit = useCallback(() => {
    const { file, title, caption, category } = getValues();
    if (category === '선택하세요') {
      return alert('카테고리를 선택해주세요');
    }
    uploadPostMutation({
      variables: { file: file[0], title, caption, category },
    });
  }, []);

  useEffect(() => {
    if (watchingPhotoFile && watchingPhotoFile.length > 0) {
      const photoFile = watchingPhotoFile[0];
      const objectUrl: string = URL.createObjectURL(photoFile);
      setPhotoPreview(objectUrl);
    }
  }, [watchingPhotoFile]);

  return (
    <AuthLayout>
      <PageTitle title="게시글 업로드" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faDice} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="file"
            accept="image/*"
            {...register('file', { required: '이미지를 입력해주세요' })}
            hasError={Boolean(errors?.file?.message)}
          />
          <FormError message={errors?.file?.message} />

          <Input
            type="title"
            placeholder="제목"
            {...register('title', { required: '제목을 입력해주세요' })}
            hasError={Boolean(errors?.title?.message)}
          />
          <FormError message={errors?.title?.message} />

          <Input
            type="caption"
            placeholder="설명"
            {...register('caption', { required: '설명을 입력해주세요' })}
            hasError={Boolean(errors?.caption?.message)}
          />
          <FormError message={errors?.caption?.message} />

          <FormOption
            register={register}
            name="category"
            options={[
              '선택하세요',
              '디지털기기',
              '생활가전',
              '가구_인테리어',
              '유야',
              '생활_가공식품',
              '스포츠_래저',
              '여성패션_잡화',
              '남성패션_잡화',
              '개임_취미',
              '뷰티_미용',
              '반려동물용품',
              '도서_티켓_음반',
              '식물',
              '기타 중고물품',
            ]}
          />
          <FormError message={errors?.category?.message} />

          {photoPreview && <PostImg src={photoPreview} alt="img" />}
          <Button type="submit" value={loading ? '로딩...' : '업로드'} disabled={!isValid || loading} />
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default UploadPost;
