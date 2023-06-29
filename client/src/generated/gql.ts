/* eslint-disable */
import * as types from "./graphql";
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
  "fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  community {\n    id\n    name\n  }\n}":
    types.RegularPostFragmentDoc,
  "fragment RegularUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}":
    types.RegularUserFragmentDoc,
  "mutation CreateComment($postId: Float!, $content: String!) {\n  createComment(postId: $postId, content: $content) {\n    comment {\n      id\n      points\n      content\n      createdAt\n    }\n  }\n}":
    types.CreateCommentDocument,
  "mutation CreateCommunity($description: String!, $name: String!) {\n  createCommunity(description: $description, name: $name) {\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.CreateCommunityDocument,
  "mutation CreatePost($communityId: Int!, $content: String!, $title: String!) {\n  createPost(communityId: $communityId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}":
    types.CreatePostDocument,
  "mutation DeleteComment($commentId: Float!) {\n  deleteComment(commentId: $commentId)\n}":
    types.DeleteCommentDocument,
  "mutation ForgetPassword($email: String!) {\n  forgetPassword(email: $email) {\n    ok\n  }\n}":
    types.ForgetPasswordDocument,
  "mutation JoinCommunity($communityId: Int!) {\n  joinCommunity(id: $communityId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.JoinCommunityDocument,
  "mutation ResetPassword($password: String!, $token: String!) {\n  resetPassword(password: $password, token: $token) {\n    errors {\n      field\n      message\n    }\n    ok\n  }\n}":
    types.ResetPasswordDocument,
  "mutation SignOut {\n  signOut\n}": types.SignOutDocument,
  "mutation SignIn($password: String!, $email: String!) {\n  signin(password: $password, email: $email) {\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.SignInDocument,
  "mutation Signup($password: String!, $email: String!, $username: String!) {\n  signup(password: $password, email: $email, username: $username) {\n    errors {\n      field\n      message\n    }\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n  }\n}":
    types.SignupDocument,
  "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    errors {\n      field\n      message\n    }\n    upvote {\n      creatorId\n      postId\n      value\n    }\n  }\n}":
    types.VoteDocument,
  "query Clubs {\n  allCommunities {\n    id\n    name\n  }\n}":
    types.ClubsDocument,
  "query Community($communityId: Float!) {\n  community(id: $communityId) {\n    id\n    name\n    description\n    members {\n      id\n      username\n    }\n    dateCreated\n    memberIds\n    hasJoined\n  }\n}":
    types.CommunityDocument,
  "query CommunityPosts($limit: Int!, $communityId: Float!, $cursor: String) {\n  communityPosts(limit: $limit, communityId: $communityId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}":
    types.CommunityPostsDocument,
  "query FeedPosts($limit: Int!, $cursor: String) {\n  myCommunitiesPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      community {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}":
    types.FeedPostsDocument,
  "query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}":
    types.LatestPostsDocument,
  "query Me {\n  me {\n    id\n    username\n  }\n}": types.MeDocument,
  "query myCommunities {\n  meWithCommunities {\n    memberCommunities {\n      id\n      name\n    }\n  }\n}":
    types.MyCommunitiesDocument,
  "query PopularCommunities {\n  popularCommunities {\n    name\n    id\n    numberOfMembers\n  }\n}":
    types.PopularCommunitiesDocument,
  "query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}":
    types.PopularPostsDocument,
  "query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      username\n    }\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}":
    types.PostDocument,
  "query PostComments($postId: Float!) {\n  postComments(postId: $postId) {\n    id\n    content\n    isOwner\n    creator {\n      id\n      username\n    }\n  }\n}":
    types.PostCommentsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  community {\n    id\n    name\n  }\n}"
): (typeof documents)["fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  community {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "fragment RegularUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}"
): (typeof documents)["fragment RegularUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateComment($postId: Float!, $content: String!) {\n  createComment(postId: $postId, content: $content) {\n    comment {\n      id\n      points\n      content\n      createdAt\n    }\n  }\n}"
): (typeof documents)["mutation CreateComment($postId: Float!, $content: String!) {\n  createComment(postId: $postId, content: $content) {\n    comment {\n      id\n      points\n      content\n      createdAt\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateCommunity($description: String!, $name: String!) {\n  createCommunity(description: $description, name: $name) {\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation CreateCommunity($description: String!, $name: String!) {\n  createCommunity(description: $description, name: $name) {\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreatePost($communityId: Int!, $content: String!, $title: String!) {\n  createPost(communityId: $communityId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}"
): (typeof documents)["mutation CreatePost($communityId: Int!, $content: String!, $title: String!) {\n  createPost(communityId: $communityId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteComment($commentId: Float!) {\n  deleteComment(commentId: $commentId)\n}"
): (typeof documents)["mutation DeleteComment($commentId: Float!) {\n  deleteComment(commentId: $commentId)\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ForgetPassword($email: String!) {\n  forgetPassword(email: $email) {\n    ok\n  }\n}"
): (typeof documents)["mutation ForgetPassword($email: String!) {\n  forgetPassword(email: $email) {\n    ok\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation JoinCommunity($communityId: Int!) {\n  joinCommunity(id: $communityId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation JoinCommunity($communityId: Int!) {\n  joinCommunity(id: $communityId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation ResetPassword($password: String!, $token: String!) {\n  resetPassword(password: $password, token: $token) {\n    errors {\n      field\n      message\n    }\n    ok\n  }\n}"
): (typeof documents)["mutation ResetPassword($password: String!, $token: String!) {\n  resetPassword(password: $password, token: $token) {\n    errors {\n      field\n      message\n    }\n    ok\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation SignOut {\n  signOut\n}"
): (typeof documents)["mutation SignOut {\n  signOut\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation SignIn($password: String!, $email: String!) {\n  signin(password: $password, email: $email) {\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation SignIn($password: String!, $email: String!) {\n  signin(password: $password, email: $email) {\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Signup($password: String!, $email: String!, $username: String!) {\n  signup(password: $password, email: $email, username: $username) {\n    errors {\n      field\n      message\n    }\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n  }\n}"
): (typeof documents)["mutation Signup($password: String!, $email: String!, $username: String!) {\n  signup(password: $password, email: $email, username: $username) {\n    errors {\n      field\n      message\n    }\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    errors {\n      field\n      message\n    }\n    upvote {\n      creatorId\n      postId\n      value\n    }\n  }\n}"
): (typeof documents)["mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    errors {\n      field\n      message\n    }\n    upvote {\n      creatorId\n      postId\n      value\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Clubs {\n  allCommunities {\n    id\n    name\n  }\n}"
): (typeof documents)["query Clubs {\n  allCommunities {\n    id\n    name\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Community($communityId: Float!) {\n  community(id: $communityId) {\n    id\n    name\n    description\n    members {\n      id\n      username\n    }\n    dateCreated\n    memberIds\n    hasJoined\n  }\n}"
): (typeof documents)["query Community($communityId: Float!) {\n  community(id: $communityId) {\n    id\n    name\n    description\n    members {\n      id\n      username\n    }\n    dateCreated\n    memberIds\n    hasJoined\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query CommunityPosts($limit: Int!, $communityId: Float!, $cursor: String) {\n  communityPosts(limit: $limit, communityId: $communityId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query CommunityPosts($limit: Int!, $communityId: Float!, $cursor: String) {\n  communityPosts(limit: $limit, communityId: $communityId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query FeedPosts($limit: Int!, $cursor: String) {\n  myCommunitiesPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      community {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}"
): (typeof documents)["query FeedPosts($limit: Int!, $cursor: String) {\n  myCommunitiesPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      community {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Me {\n  me {\n    id\n    username\n  }\n}"
): (typeof documents)["query Me {\n  me {\n    id\n    username\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query myCommunities {\n  meWithCommunities {\n    memberCommunities {\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["query myCommunities {\n  meWithCommunities {\n    memberCommunities {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PopularCommunities {\n  popularCommunities {\n    name\n    id\n    numberOfMembers\n  }\n}"
): (typeof documents)["query PopularCommunities {\n  popularCommunities {\n    name\n    id\n    numberOfMembers\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      community {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      username\n    }\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}"
): (typeof documents)["query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      username\n    }\n    community {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PostComments($postId: Float!) {\n  postComments(postId: $postId) {\n    id\n    content\n    isOwner\n    creator {\n      id\n      username\n    }\n  }\n}"
): (typeof documents)["query PostComments($postId: Float!) {\n  postComments(postId: $postId) {\n    id\n    content\n    isOwner\n    creator {\n      id\n      username\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> =
  TDocumentNode extends DocumentNode<infer TType, any> ? TType : never;
