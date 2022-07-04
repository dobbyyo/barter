import React, { FC, useCallback, useEffect, useState } from 'react';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { Comment, MeQuery, useDeleteCommentMutation, useEditCommentMutation } from '../../generated/graphql';
import useConfirm from '../../hook/useConfirm';
import { BoldText } from '../shared';

interface Props {
  comment: Comment;
  userData?: MeQuery;
  id: number | undefined;
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

const PostCommentBox: FC<Props> = ({ comment, userData, id }) => {
  const [edit, setEdit] = useState(false);
  const [confirmData, setConfirmData] = useState(false);
  const ok = () => setConfirmData(true);
  const cancel = () => setConfirmData(false);
  const confirmDelete = useConfirm('삭제 하시겠습니까?', ok, cancel);

  const onEdit = useCallback(() => {
    setEdit((pre) => !pre);
  }, []);
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      payload: comment.payload,
    },
  });
  const [updateCommentMutation, { loading: updateLoading }] = useEditCommentMutation({
    update(cache, result) {
      const { payload } = getValues();
      const success = result.data?.editComment?.success;
      const commentId = result.data?.editComment.id;

      if (success && userData?.me) {
        cache.modify({
          id: `Comment:${commentId}`,
          fields: {
            payload: () => payload,
          },
        });
        setEdit(false);
      }
    },
  });

  const onUpdate = useCallback(() => {
    const { payload } = getValues();
    if (updateLoading) {
      return null;
    }
    return updateCommentMutation({
      variables: {
        id: comment.id,
        payload,
      },
    });
  }, []);

  const [deleteCommentMutation] = useDeleteCommentMutation({
    update(cache, result) {
      const commentId = result.data?.deleteComment.id;
      const success = result.data?.deleteComment.success;

      if (success) {
        cache.evict({ id: `Comment:${commentId}` });
        cache.gc();
        cache.modify({
          id: `Post:${id}`,
          fields: {
            commentNumber(prev) {
              return prev - 1;
            },
          },
        });
      }
    },
  });

  const onDelete = useCallback(() => {
    if (confirmDelete) {
      deleteCommentMutation({
        variables: {
          id: comment.id,
        },
      });
    }
  }, [confirmData]);

  useEffect(() => {
    if (confirmData) {
      onDelete();
    }
  }, [confirmData]);

  return (
    <CommentContainer>
      <Bold>
        <BoldText>{comment.user.username}</BoldText>
      </Bold>
      {edit ? (
        <Form onSubmit={handleSubmit(onUpdate)}>
          <Input type="text" {...register('payload')} autoFocus />
          <input type="submit" value="확인" />
          <FontAwesomeIcon icon={faX} size="lg" className="icon" onClick={confirmDelete} />
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
