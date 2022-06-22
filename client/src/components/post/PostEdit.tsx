/* eslint-disable no-unneeded-ternary */
import React, { FC, useCallback, useEffect, useState } from 'react';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { MeQuery, SeePostQuery, useEditPostMutation } from '../../generated/graphql';
import AuthLayout from '../auth/AuthLayout';
import FormBox from '../auth/FormBox';
import FormOption from '../auth/FormOption';
import PageTitle from '../PageTitle';
import { Button, Input } from '../shared';
import routes from '../../routes';
import FormError from '../auth/FormError';

const PostImg = styled.img`
  width: 80%;
  padding: 20px 0;
`;

interface Props {
  userData: MeQuery | undefined;
  post: SeePostQuery | undefined;
}
const EditPost: FC<Props> = ({ userData, post }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (userData?.me.user?.id !== post?.seePost.post?.user.id) {
      alert('자신의 글만 편집할 수 있습니다.');
      navigate(routes.home);
    }
  }, []);
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      file: post?.seePost.post?.file,
      title: post?.seePost.post?.title,
      caption: post?.seePost.post?.caption,
      category: post?.seePost.post?.category,
    },
  });

  const watchingPostFile = watch('file');
  const [uri, setUri] = useState<string>('');

  const [editPostMutation, { loading }] = useEditPostMutation({
    update(cache, { data }) {
      if (data?.editPost.success === false) {
        return null;
      }
      const { file, title, caption, category } = getValues();
      console.log(file);
      cache.modify({
        id: `Post:${data?.editPost.id}`,
        fields: {
          file: () => uri,
          title: () => title,
          caption: () => caption,
          category: () => category,
        },
      });
      return navigate(-1);
    },
  });
  const onSubmit = useCallback(() => {
    const { file, title, caption, category } = getValues();
    if (file && title && caption && category) {
      editPostMutation({
        variables: {
          id: Number(post?.seePost.post?.id),
          title,
          caption,
          category,
          file: uri,
        },
      });
    }
  }, []);

  useEffect(() => {
    const uuri = post?.seePost.post?.file;
    if (uuri) {
      setUri(uuri);
    }

    if (watchingPostFile !== uuri && watchingPostFile) {
      const PostFile = watchingPostFile[0];
      const objectUrl: string = URL.createObjectURL(PostFile as any);
      setUri(objectUrl);
    }
  }, [watchingPostFile]);

  return (
    <AuthLayout>
      <PageTitle title="게시글 수정" />
      <FormBox>
        <div>
          <FontAwesomeIcon icon={faDice} size="3x" />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input type="file" accept="image/*" {...register('file')} hasError={Boolean(errors?.file?.message)} />
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
          <FormError message={errors?.category?.message} />

          {uri && <PostImg src={uri} alt="img" />}
          <Button type="submit" value={loading ? '로딩...' : '편집'} disabled={!isValid || loading} />
        </form>
      </FormBox>
    </AuthLayout>
  );
};

export default EditPost;
