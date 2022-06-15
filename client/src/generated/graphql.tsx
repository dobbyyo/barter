/* eslint-disable max-len */
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
  editComment?: Maybe<MutationResult>;
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
      hashtag?: Array<{ __typename?: 'Hashtag'; id: number; hashtag: string } | null> | null;
      user: { __typename?: 'User'; id: number; name: string; username: string; email: string; avatar?: string | null };
    } | null;
  };
};

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
