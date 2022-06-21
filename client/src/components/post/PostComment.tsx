import React, { FC, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Comment, SeePostQuery, useCreateCommentMutation } from '../../generated/graphql';
import LoginUser from '../../hook/loginUser';

import FormError from '../auth/FormError';
import PostCommentBox from './PostCommentBox';
import { BoldText, Btn } from '../shared';

const CommentWrapper = styled.div`
  margin-top: 20px;
  width: 70%;
  min-width: 900px;
`;

const TopBox = styled.div`
  width: 100%;
  border-top: 1px solid ${(props) => props.theme.fontColor};
  border-bottom: 1px solid ${(props) => props.theme.fontColor};
  padding: 0 40px;
  display: flex;
  justify-content: center;
  align-items: center;

  .one {
    width: 50%;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .two {
    border-left: 1px solid ${(props) => props.theme.fontColor};
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
  }
`;

const FormWrapper = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  margin-top: 20px;
  flex-direction: column;
  form {
    position: relative;
    width: 100%;
    border: 1px solid ${(props) => props.theme.borderColor};
    padding: 0 20px;
    .ok {
      position: absolute;
      right: 20px;
      top: 15px;
    }
  }
`;
const Input = styled.input<{ hasError?: boolean }>`
  width: 90%;
  height: 40px;
`;

interface Props {
  data: SeePostQuery | undefined;
  id: number | undefined;
}

const PostComment: FC<Props> = ({ data, id }) => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const { data: userData } = LoginUser();

  const [createCommentMutation, { loading }] = useCreateCommentMutation({
    update(cache, result) {
      const { payload } = getValues();
      const success = result.data?.createComment.success;
      const commentId = result.data?.createComment.id;

      if (success && userData?.me) {
        const newComment = {
          __typename: 'Comment',
          createdAt: `${Date.now()} ${''} `,
          id: commentId,
          isMine: true,
          payload,
          user: {
            ...userData.me,
          },
        };
        cache.modify({
          id: `Post:${id}`,
          fields: {
            comments(prev) {
              return [...prev, newComment];
            },
            commentNumber(prev) {
              return prev + 1;
            },
          },
        });
      }
    },
  });

  const onSubmit = useCallback(() => {
    const { payload } = getValues();
    setValue('payload', '');
    if (loading) {
      return null;
    }
    return createCommentMutation({
      variables: {
        postId: id as number,
        payload,
      },
    });
  }, []);

  return (
    <CommentWrapper>
      <TopBox>
        <div className="one">
          <span>
            총 <BoldText>{data?.seePost.post?.commentNumber}</BoldText>건의 댓글이 있습니다.
          </span>
        </div>
        <div className="two">
          <Btn>댓글 작성하기</Btn>
        </div>
      </TopBox>
      {data?.seePost.post?.comments.map((comment) => (
        <PostCommentBox comment={comment as Comment} userData={userData} id={id} key={comment?.id} />
      ))}

      <FormWrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="text"
            placeholder="댓글을 작성해주세요"
            {...register('payload', { required: '댓글을 작성해주세요' })}
            hasError={Boolean(errors?.payload?.message)}
          />

          <input type="submit" value="확인" className="ok" />
        </form>
        <FormError message={errors?.payload?.message} />
      </FormWrapper>
    </CommentWrapper>
  );
};

export default PostComment;
