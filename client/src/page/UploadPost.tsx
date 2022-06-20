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
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
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
  console.log(isLoggedIn);

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

      const newPost = data?.uploadPost.Post;

      cache.modify({
        id: 'ROOT_QUERY',
        fields: {
          total(prev) {
            return prev + 1;
          },
          allPosts(prev) {
            return [...prev];
          },
        },
      });
      navigate(-1);
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
          <Input
            type="title"
            placeholder="제목"
            {...register('title', { required: '제목을 입력해주세요' })}
            hasError={Boolean(errors?.title?.message)}
          />
          <Input
            type="caption"
            placeholder="설명"
            {...register('caption', { required: '설명을 입력해주세요' })}
            hasError={Boolean(errors?.caption?.message)}
          />
          <FormOption
            register={register}
            name="category"
            options={[
              '선택하세요',
              '디지털기기',
              '생활가전',
              '가구/인테리어',
              '유야',
              '생활/가공식품',
              '스포츠/래저',
              '여성패션/잡화',
              '남성패션/잡화',
              '개임/취미',
              '뷰티/미용',
              '반려동물용품',
              '도서/티켓/음반',
              '식물',
              '기타 중고물품',
            ]}
          />
          {photoPreview && <PostImg src={photoPreview} alt="img" />}
          <Button type="submit" value={loading ? '로딩...' : '업로드'} disabled={!isValid || loading} />
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default UploadPost;
