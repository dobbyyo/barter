/* eslint-disable no-use-before-define */
/* eslint-disable import/newline-after-import */

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export type Comment = {
  __typename?: 'Comment';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  isMine: Scalars['Boolean'];
  payload: Scalars['String'];
  post: Post;
  updatedAt: Scalars['String'];
  user: User;
};

export type DeleteCommentResult = {
  __typename?: 'DeleteCommentResult';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type Hashtag = {
  __typename?: 'Hashtag';
  createdAt: Scalars['String'];
  hashtag: Scalars['String'];
  id: Scalars['Int'];
  posts?: Maybe<Array<Maybe<Post>>>;
  totalPosts: Scalars['Int'];
  updatedAt: Scalars['String'];
};

export type HashtagPostsArgs = {
  page: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  post: Post;
  updatedAt: Scalars['String'];
};

export type LoginResult = {
  __typename?: 'LoginResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  token?: Maybe<Scalars['String']>;
};

export type MeResult = {
  __typename?: 'MeResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type Message = {
  __typename?: 'Message';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  payload: Scalars['String'];
  read: Scalars['Boolean'];
  room: Room;
  updatedAt: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: CreateCommentResult;
  deleteComment: DeleteCommentResult;
  deletePost: MutationResult;
  deleteUser: MutationResult;
  editComment: EditCommentResult;
  editPost: MutationResult;
  editProfile: MutationResult;
  followUser: MutationResult;
  join: MutationResult;
  login: LoginResult;
  readMessage: MutationResult;
  sendMessage?: Maybe<MutationResult>;
  toggleLike: MutationResult;
  unfollowUser: MutationResult;
  uploadPost: UploadResult;
};

export type MutationCreateCommentArgs = {
  payload: Scalars['String'];
  postId: Scalars['Int'];
};

export type MutationDeleteCommentArgs = {
  id: Scalars['Int'];
};

export type MutationDeletePostArgs = {
  id: Scalars['Int'];
};

export type MutationDeleteUserArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationEditCommentArgs = {
  id: Scalars['Int'];
  payload: Scalars['String'];
};

export type MutationEditPostArgs = {
  caption: Scalars['String'];
  category: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  id: Scalars['Int'];
  title: Scalars['String'];
};

export type MutationEditProfileArgs = {
  avatar?: InputMaybe<Scalars['Upload']>;
  bio?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
};

export type MutationFollowUserArgs = {
  username: Scalars['String'];
};

export type MutationJoinArgs = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type MutationReadMessageArgs = {
  id: Scalars['Int'];
};

export type MutationSendMessageArgs = {
  payload: Scalars['String'];
  roomId?: InputMaybe<Scalars['Int']>;
  userId?: InputMaybe<Scalars['Int']>;
};

export type MutationToggleLikeArgs = {
  id: Scalars['Int'];
};

export type MutationUnfollowUserArgs = {
  username: Scalars['String'];
};

export type MutationUploadPostArgs = {
  caption?: InputMaybe<Scalars['String']>;
  category: Scalars['String'];
  file: Scalars['Upload'];
  title: Scalars['String'];
};

export type MutationResult = {
  __typename?: 'MutationResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type Post = {
  __typename?: 'Post';
  caption?: Maybe<Scalars['String']>;
  category: Scalars['String'];
  commentNumber: Scalars['Int'];
  comments: Array<Maybe<Comment>>;
  createdAt: Scalars['String'];
  file: Scalars['String'];
  hashtag?: Maybe<Array<Maybe<Hashtag>>>;
  id: Scalars['Int'];
  isLiked: Scalars['Boolean'];
  isMine: Scalars['Boolean'];
  likes: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  allPosts: AllPostsResult;
  me: MeResult;
  searchPosts: SearchPostsResult;
  searchUsers: SearchResult;
  seeFeed: SeeFeedResult;
  seeFollowers: SeeFollowersResult;
  seeFollowings?: Maybe<SeeFollowingsResult>;
  seeHashtag?: Maybe<Hashtag>;
  seeLikes: SeeLikesResult;
  seePost: SeePostResult;
  seeProfile: SeeProfileResult;
  seeRoom: SeeRoomResult;
  seeRooms: SeeRoomsResult;
};

export type QueryAllPostsArgs = {
  page: Scalars['Int'];
};

export type QuerySearchPostsArgs = {
  keyword: Scalars['String'];
  page: Scalars['Int'];
};

export type QuerySearchUsersArgs = {
  keyword: Scalars['String'];
};

export type QuerySeeFeedArgs = {
  page: Scalars['Int'];
};

export type QuerySeeFollowersArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};

export type QuerySeeFollowingsArgs = {
  page: Scalars['Int'];
  username: Scalars['String'];
};

export type QuerySeeHashtagArgs = {
  hashtag: Scalars['String'];
};

export type QuerySeeLikesArgs = {
  id: Scalars['Int'];
};

export type QuerySeePostArgs = {
  id: Scalars['Int'];
};

export type QuerySeeProfileArgs = {
  username: Scalars['String'];
};

export type QuerySeeRoomArgs = {
  id: Scalars['Int'];
};

export type Room = {
  __typename?: 'Room';
  createdAt: Scalars['String'];
  in: Scalars['Int'];
  message?: Maybe<Array<Maybe<Message>>>;
  unreadTotal: Scalars['Int'];
  updatedAt: Scalars['String'];
  users?: Maybe<Array<Maybe<User>>>;
};

export type SeeFollowersResult = {
  __typename?: 'SeeFollowersResult';
  error?: Maybe<Scalars['String']>;
  followers?: Maybe<Array<Maybe<User>>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type SeeFollowingsResult = {
  __typename?: 'SeeFollowingsResult';
  error?: Maybe<Scalars['String']>;
  followings?: Maybe<Array<Maybe<User>>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  roomUpdates?: Maybe<Message>;
};

export type SubscriptionRoomUpdatesArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  avatar?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  createdAt: Scalars['String'];
  email: Scalars['String'];
  followers?: Maybe<Array<Maybe<User>>>;
  followings?: Maybe<Array<Maybe<User>>>;
  id: Scalars['Int'];
  isFollowing: Scalars['Boolean'];
  isMe: Scalars['Boolean'];
  name: Scalars['String'];
  totalFollowers: Scalars['Int'];
  totalFollowings: Scalars['Int'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
};

export type AllPostsResult = {
  __typename?: 'allPostsResult';
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Array<Maybe<Post>>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type CreateCommentResult = {
  __typename?: 'createCommentResult';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type EditCommentResult = {
  __typename?: 'editCommentResult';
  error?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  success: Scalars['Boolean'];
};

export type SearchPostsResult = {
  __typename?: 'searchPostsResult';
  error?: Maybe<Scalars['String']>;
  posts?: Maybe<Array<Maybe<Post>>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type SearchResult = {
  __typename?: 'searchResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<Array<Maybe<User>>>;
};

export type SeeFeedResult = {
  __typename?: 'seeFeedResult';
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Array<Maybe<Post>>>;
  success: Scalars['Boolean'];
  totalPages?: Maybe<Scalars['Int']>;
};

export type SeeLikesResult = {
  __typename?: 'seeLikesResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<Array<Maybe<User>>>;
};

export type SeePostResult = {
  __typename?: 'seePostResult';
  error?: Maybe<Scalars['String']>;
  post?: Maybe<Post>;
  success: Scalars['Boolean'];
};

export type SeeProfileResult = {
  __typename?: 'seeProfileResult';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
  user?: Maybe<User>;
};

export type SeeRoomResult = {
  __typename?: 'seeRoomResult';
  error?: Maybe<Scalars['String']>;
  room?: Maybe<Room>;
  success: Scalars['Boolean'];
};

export type SeeRoomsResult = {
  __typename?: 'seeRoomsResult';
  error?: Maybe<Scalars['String']>;
  room?: Maybe<Array<Maybe<Room>>>;
  success: Scalars['Boolean'];
};

export type UploadResult = {
  __typename?: 'uploadResult';
  Post?: Maybe<Post>;
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type JoinMutationVariables = Exact<{
  name: Scalars['String'];
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type JoinMutation = {
  __typename?: 'Mutation';
  join: { __typename?: 'MutationResult'; success: boolean; error?: string | null };
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: { __typename?: 'LoginResult'; success: boolean; error?: string | null };
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Int'];
  payload: Scalars['String'];
}>;

export type CreateCommentMutation = {
  __typename?: 'Mutation';
  createComment: { __typename?: 'createCommentResult'; id?: number | null; success: boolean; error?: string | null };
};

export type EditCommentMutationVariables = Exact<{
  id: Scalars['Int'];
  payload: Scalars['String'];
}>;

export type EditCommentMutation = {
  __typename?: 'Mutation';
  editComment: { __typename?: 'editCommentResult'; id?: number | null; success: boolean; error?: string | null };
};

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeleteCommentMutation = {
  __typename?: 'Mutation';
  deleteComment: { __typename?: 'DeleteCommentResult'; id?: number | null; success: boolean; error?: string | null };
};

export type UploadPostMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
  caption?: InputMaybe<Scalars['String']>;
  category: Scalars['String'];
}>;

export type UploadPostMutation = {
  __typename?: 'Mutation';
  uploadPost: {
    __typename?: 'uploadResult';
    success: boolean;
    error?: string | null;
    Post?: {
      __typename?: 'Post';
      id: number;
      file: string;
      isMine: boolean;
      user: { __typename?: 'User'; id: number; username: string; email: string; avatar?: string | null };
      hashtag?: Array<{ __typename?: 'Hashtag'; id: number; hashtag: string } | null> | null;
    } | null;
  };
};

export type DeletePostMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeletePostMutation = {
  __typename?: 'Mutation';
  deletePost: { __typename?: 'MutationResult'; success: boolean; error?: string | null };
};

export type EditPostMutationVariables = Exact<{
  id: Scalars['Int'];
  title: Scalars['String'];
  caption: Scalars['String'];
  file?: InputMaybe<Scalars['Upload']>;
  category: Scalars['String'];
}>;

export type EditPostMutation = {
  __typename?: 'Mutation';
  editPost: { __typename?: 'MutationResult'; success: boolean; error?: string | null };
};

export type ToggleLikeMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type ToggleLikeMutation = {
  __typename?: 'Mutation';
  toggleLike: { __typename?: 'MutationResult'; success: boolean; error?: string | null };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me: {
    __typename?: 'MeResult';
    success: boolean;
    error?: string | null;
    user?: {
      __typename?: 'User';
      id: number;
      name: string;
      username: string;
      email: string;
      bio?: string | null;
      avatar?: string | null;
    } | null;
  };
};

export type AllPostsQueryVariables = Exact<{
  page: Scalars['Int'];
}>;

export type AllPostsQuery = {
  __typename?: 'Query';
  allPosts: {
    __typename?: 'allPostsResult';
    success: boolean;
    error?: string | null;
    totalPages?: number | null;
    post?: Array<{
      __typename?: 'Post';
      id: number;
      file: string;
      title: string;
      caption?: string | null;
      category: string;
      likes: number;
      isMine: boolean;
      isLiked: boolean;
      updatedAt: string;
      createdAt: string;
      commentNumber: number;
      user: { __typename?: 'User'; id: number; name: string; username: string; email: string; avatar?: string | null };
    } | null> | null;
  };
};

export type SeePostQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type SeePostQuery = {
  __typename?: 'Query';
  seePost: {
    __typename?: 'seePostResult';
    success: boolean;
    error?: string | null;
    post?: {
      __typename?: 'Post';
      id: number;
      file: string;
      title: string;
      caption?: string | null;
      category: string;
      likes: number;
      isMine: boolean;
      isLiked: boolean;
      updatedAt: string;
      createdAt: string;
      commentNumber: number;
      comments: Array<{
        __typename?: 'Comment';
        id: number;
        payload: string;
        isMine: boolean;
        createdAt: string;
        user: { __typename?: 'User'; id: number; email: string; username: string; avatar?: string | null };
      } | null>;
      hashtag?: Array<{ __typename?: 'Hashtag'; id: number; hashtag: string } | null> | null;
      user: { __typename?: 'User'; id: number; name: string; username: string; email: string; avatar?: string | null };
    } | null;
  };
};

export const JoinDocument = gql`
  mutation join($name: String!, $username: String!, $email: String!, $password: String!) {
    join(name: $name, username: $username, email: $email, password: $password) {
      success
      error
    }
  }
`;
export type JoinMutationFn = Apollo.MutationFunction<JoinMutation, JoinMutationVariables>;

/**
 * __useJoinMutation__
 *
 * To run a mutation, you first call `useJoinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinMutation, { data, loading, error }] = useJoinMutation({
 *   variables: {
 *      name: // value for 'name'
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useJoinMutation(baseOptions?: Apollo.MutationHookOptions<JoinMutation, JoinMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<JoinMutation, JoinMutationVariables>(JoinDocument, options);
}
export type JoinMutationHookResult = ReturnType<typeof useJoinMutation>;
export type JoinMutationResult = Apollo.MutationResult<JoinMutation>;
export type JoinMutationOptions = Apollo.BaseMutationOptions<JoinMutation, JoinMutationVariables>;
export const LoginDocument = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      error
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const CreateCommentDocument = gql`
  mutation createComment($postId: Int!, $payload: String!) {
    createComment(postId: $postId, payload: $payload) {
      id
      success
      error
    }
  }
`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useCreateCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
}
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const EditCommentDocument = gql`
  mutation editComment($id: Int!, $payload: String!) {
    editComment(id: $id, payload: $payload) {
      id
      success
      error
    }
  }
`;
export type EditCommentMutationFn = Apollo.MutationFunction<EditCommentMutation, EditCommentMutationVariables>;

/**
 * __useEditCommentMutation__
 *
 * To run a mutation, you first call `useEditCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editCommentMutation, { data, loading, error }] = useEditCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *      payload: // value for 'payload'
 *   },
 * });
 */
export function useEditCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<EditCommentMutation, EditCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditCommentMutation, EditCommentMutationVariables>(EditCommentDocument, options);
}
export type EditCommentMutationHookResult = ReturnType<typeof useEditCommentMutation>;
export type EditCommentMutationResult = Apollo.MutationResult<EditCommentMutation>;
export type EditCommentMutationOptions = Apollo.BaseMutationOptions<EditCommentMutation, EditCommentMutationVariables>;
export const DeleteCommentDocument = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      id
      success
      error
    }
  }
`;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
}
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const UploadPostDocument = gql`
  mutation uploadPost($file: Upload!, $title: String!, $caption: String, $category: String!) {
    uploadPost(file: $file, title: $title, caption: $caption, category: $category) {
      success
      error
      Post {
        id
        file
        isMine
        user {
          id
          username
          email
          avatar
        }
        hashtag {
          id
          hashtag
        }
      }
    }
  }
`;
export type UploadPostMutationFn = Apollo.MutationFunction<UploadPostMutation, UploadPostMutationVariables>;

/**
 * __useUploadPostMutation__
 *
 * To run a mutation, you first call `useUploadPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadPostMutation, { data, loading, error }] = useUploadPostMutation({
 *   variables: {
 *      file: // value for 'file'
 *      title: // value for 'title'
 *      caption: // value for 'caption'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useUploadPostMutation(
  baseOptions?: Apollo.MutationHookOptions<UploadPostMutation, UploadPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UploadPostMutation, UploadPostMutationVariables>(UploadPostDocument, options);
}
export type UploadPostMutationHookResult = ReturnType<typeof useUploadPostMutation>;
export type UploadPostMutationResult = Apollo.MutationResult<UploadPostMutation>;
export type UploadPostMutationOptions = Apollo.BaseMutationOptions<UploadPostMutation, UploadPostMutationVariables>;
export const DeletePostDocument = gql`
  mutation deletePost($id: Int!) {
    deletePost(id: $id) {
      success
      error
    }
  }
`;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePostMutation(
  baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, options);
}
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const EditPostDocument = gql`
  mutation editPost($id: Int!, $title: String!, $caption: String!, $file: Upload, $category: String!) {
    editPost(id: $id, title: $title, caption: $caption, file: $file, category: $category) {
      success
      error
    }
  }
`;
export type EditPostMutationFn = Apollo.MutationFunction<EditPostMutation, EditPostMutationVariables>;

/**
 * __useEditPostMutation__
 *
 * To run a mutation, you first call `useEditPostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditPostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editPostMutation, { data, loading, error }] = useEditPostMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      caption: // value for 'caption'
 *      file: // value for 'file'
 *      category: // value for 'category'
 *   },
 * });
 */
export function useEditPostMutation(
  baseOptions?: Apollo.MutationHookOptions<EditPostMutation, EditPostMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<EditPostMutation, EditPostMutationVariables>(EditPostDocument, options);
}
export type EditPostMutationHookResult = ReturnType<typeof useEditPostMutation>;
export type EditPostMutationResult = Apollo.MutationResult<EditPostMutation>;
export type EditPostMutationOptions = Apollo.BaseMutationOptions<EditPostMutation, EditPostMutationVariables>;
export const ToggleLikeDocument = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      success
      error
    }
  }
`;
export type ToggleLikeMutationFn = Apollo.MutationFunction<ToggleLikeMutation, ToggleLikeMutationVariables>;

/**
 * __useToggleLikeMutation__
 *
 * To run a mutation, you first call `useToggleLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleLikeMutation, { data, loading, error }] = useToggleLikeMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useToggleLikeMutation(
  baseOptions?: Apollo.MutationHookOptions<ToggleLikeMutation, ToggleLikeMutationVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<ToggleLikeMutation, ToggleLikeMutationVariables>(ToggleLikeDocument, options);
}
export type ToggleLikeMutationHookResult = ReturnType<typeof useToggleLikeMutation>;
export type ToggleLikeMutationResult = Apollo.MutationResult<ToggleLikeMutation>;
export type ToggleLikeMutationOptions = Apollo.BaseMutationOptions<ToggleLikeMutation, ToggleLikeMutationVariables>;
export const MeDocument = gql`
  query me {
    me {
      success
      error
      user {
        id
        name
        username
        email
        bio
        avatar
      }
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const AllPostsDocument = gql`
  query allPosts($page: Int!) {
    allPosts(page: $page) {
      success
      error
      totalPages
      post {
        id
        file
        title
        caption
        category
        likes
        isMine
        isLiked
        updatedAt
        createdAt
        commentNumber
        user {
          id
          name
          username
          email
          avatar
        }
      }
    }
  }
`;

/**
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
}
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
}
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;
export const SeePostDocument = gql`
  query seePost($id: Int!) {
    seePost(id: $id) {
      success
      error
      post {
        id
        file
        title
        caption
        category
        likes
        isMine
        isLiked
        updatedAt
        createdAt
        commentNumber
        comments {
          id
          payload
          isMine
          createdAt
          user {
            id
            email
            username
            avatar
          }
        }
        hashtag {
          id
          hashtag
        }
        user {
          id
          name
          username
          email
          avatar
        }
      }
    }
  }
`;

/**
 * __useSeePostQuery__
 *
 * To run a query within a React component, call `useSeePostQuery` and pass it any options that fit your needs.
 * When your component renders, `useSeePostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSeePostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useSeePostQuery(baseOptions: Apollo.QueryHookOptions<SeePostQuery, SeePostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<SeePostQuery, SeePostQueryVariables>(SeePostDocument, options);
}
export function useSeePostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SeePostQuery, SeePostQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<SeePostQuery, SeePostQueryVariables>(SeePostDocument, options);
}
export type SeePostQueryHookResult = ReturnType<typeof useSeePostQuery>;
export type SeePostLazyQueryHookResult = ReturnType<typeof useSeePostLazyQuery>;
export type SeePostQueryResult = Apollo.QueryResult<SeePostQuery, SeePostQueryVariables>;
