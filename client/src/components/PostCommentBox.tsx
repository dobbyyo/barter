import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { FC, useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Comment, MeQuery, useDeleteCommentMutation, useEditCommentMutation } from '../generated/graphql';
import { BoldText } from './shared';

interface Props {
  comment: Comment;
  userData?: MeQuery;
}

const CommentContainer = styled.div`
  width: 100%;
  max-width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 30px 0;
  display: flex;
`;
const Bold = styled.div`
  width: 10%;
`;

const CommentCaption = styled.span`
  margin-left: 10px;
  width: 70%;
`;
const Date = styled.div`
  width: 20%;
  text-align: end;
  margin-right: 10px;
`;
const Form = styled.form`
  width: 100%;
  .icon {
    margin-left: 10px;
  }
`;

const Input = styled.input`
  width: 90%;
  padding: 0 15px;
  :focus {
    border: 1px solid ${(props) => props.theme.borderColor};
  }
`;

const PostCommentBox: FC<Props> = ({ comment, userData }) => {
  const [edit, setEdit] = useState(false);
  const onEdit = useCallback(() => {
    setEdit((pre) => !pre);
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      payload: comment.payload,
    },
  });
  const [updateCommentMutation, { loading: updateLoading }] = useEditCommentMutation({
    update(cache, result) {
      const { payload } = getValues();
      const success = result.data?.editComment?.success;
      const commentId = result.data?.editComment.id;
    },
  });

  const onUpdate = useCallback(() => {
    const { payload } = getValues();
    if (updateLoading) {
      return null;
    }
    updateCommentMutation({
      variables: {
        id: comment.id,
        payload,
      },
    });
    return setEdit(false);
  }, []);
  const [deleteCommentMutation, { loading: deleteLoading }] = useDeleteCommentMutation({});

  return (
    <CommentContainer>
      <Bold>
        <BoldText>{comment.user.username}</BoldText>
      </Bold>
      {edit ? (
        <Form onSubmit={handleSubmit(onUpdate)}>
          <Input type="text" {...register('payload')} autoFocus />
          <input type="submit" value="확인" />
          <FontAwesomeIcon icon={faX} size="lg" className="icon" />
        </Form>
      ) : (
        <>
          <CommentCaption>{comment.payload}</CommentCaption>
          <Date>{comment.createdAt}</Date>
        </>
      )}

      {userData?.me.user?.id === comment.user.id ? (
        <FontAwesomeIcon icon={faPenToSquare} size="lg" onClick={onEdit} />
      ) : (
        <div style={{ marginRight: '10px' }} />
      )}
    </CommentContainer>
  );
};

export default PostCommentBox;
