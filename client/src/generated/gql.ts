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
  "fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  club {\n    id\n    name\n  }\n}":
    types.RegularPostFragmentDoc,
  "fragment RegularUser on User {\n  id\n  username\n  email\n  createdAt\n  updatedAt\n}":
    types.RegularUserFragmentDoc,
  "mutation createClub($description: String!, $name: String!) {\n  createClub(description: $description, name: $name) {\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.CreateClubDocument,
  "mutation CreateClubEvent($clubId: Float!, $duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!) {\n  createClubEvent(\n    clubId: $clubId\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n  ) {\n    id\n    title\n  }\n}":
    types.CreateClubEventDocument,
  "mutation CreateComment($postId: Float!, $content: String!) {\n  createComment(postId: $postId, content: $content) {\n    comment {\n      id\n      points\n      content\n      createdAt\n    }\n  }\n}":
    types.CreateCommentDocument,
  "mutation CreatePost($clubId: Int!, $content: String!, $title: String!) {\n  createPost(clubId: $clubId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}":
    types.CreatePostDocument,
  "mutation DeleteClubEvent($id: Float!) {\n  deleteClubEvent(id: $id)\n}":
    types.DeleteClubEventDocument,
  "mutation DeleteComment($commentId: Float!) {\n  deleteComment(commentId: $commentId)\n}":
    types.DeleteCommentDocument,
  "mutation DeletePost($deletePostId: Int!) {\n  deletePost(id: $deletePostId)\n}":
    types.DeletePostDocument,
  "mutation ForgetPassword($email: String!) {\n  forgetPassword(email: $email) {\n    ok\n  }\n}":
    types.ForgetPasswordDocument,
  "mutation JoinClub($clubId: Int!) {\n  joinClub(id: $clubId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.JoinClubDocument,
  "mutation ResetPassword($password: String!, $token: String!) {\n  resetPassword(password: $password, token: $token) {\n    errors {\n      field\n      message\n    }\n    ok\n  }\n}":
    types.ResetPasswordDocument,
  "mutation SignOut {\n  signOut\n}": types.SignOutDocument,
  "mutation SignIn($password: String!, $email: String!) {\n  signin(password: $password, email: $email) {\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.SignInDocument,
  "mutation Signup($password: String!, $email: String!, $username: String!) {\n  signup(password: $password, email: $email, username: $username) {\n    errors {\n      field\n      message\n    }\n    loggedInUser {\n      id\n      accessToken\n      username\n    }\n  }\n}":
    types.SignupDocument,
  "mutation UpdateClubEvent($duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!, $id: Float!) {\n  updateClubEvent(\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n    id: $id\n  ) {\n    id\n    title\n    description\n    meetingLink\n    date\n  }\n}":
    types.UpdateClubEventDocument,
  "mutation UpdatePost($updatePostId: Float!, $title: String, $content: String) {\n  updatePost(id: $updatePostId, title: $title, content: $content) {\n    post {\n      id\n    }\n    errors {\n      field\n      message\n    }\n  }\n}":
    types.UpdatePostDocument,
  "mutation Vote($value: Int!, $postId: Int!) {\n  vote(value: $value, postId: $postId) {\n    errors {\n      field\n      message\n    }\n    upvote {\n      creatorId\n      postId\n      value\n    }\n  }\n}":
    types.VoteDocument,
  "query Club($clubId: Float!) {\n  club(id: $clubId) {\n    id\n    name\n    description\n    dateCreated\n    hasJoined\n  }\n}":
    types.ClubDocument,
  "query ClubEventsWithId($limit: Float!, $clubId: Float!) {\n  clubEventsWithId(limit: $limit, clubId: $clubId) {\n    id\n    title\n    description\n    duration\n    date\n  }\n}":
    types.ClubEventsWithIdDocument,
  "query ClubPosts($limit: Int!, $clubId: Float!, $cursor: String) {\n  clubPosts(limit: $limit, clubId: $clubId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}":
    types.ClubPostsDocument,
  "query ClubEvent($clubEventId: Float!) {\n  clubEvent(id: $clubEventId) {\n    id\n    title\n    description\n    duration\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n      hasJoined\n    }\n    attendees {\n      id\n      username\n    }\n    date\n    meetingLink\n  }\n}":
    types.ClubEventDocument,
  "query FeedPosts($limit: Int!, $cursor: String) {\n  myClubsPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      club {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}":
    types.FeedPostsDocument,
  "query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}":
    types.LatestPostsDocument,
  "query Me {\n  me {\n    id\n    username\n  }\n}": types.MeDocument,
  "query myClubs {\n  meWithClubs {\n    memberClubs {\n      id\n      name\n    }\n  }\n}":
    types.MyClubsDocument,
  "query PopularClubs {\n  popularClubs {\n    id\n    name\n    numberOfMembers\n  }\n}":
    types.PopularClubsDocument,
  "query PopularEvents {\n  popularEvents {\n    id\n    title\n    duration\n    date\n    club {\n      id\n      name\n    }\n  }\n}":
    types.PopularEventsDocument,
  "query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}":
    types.PopularPostsDocument,
  "query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}":
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
  source: "fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  club {\n    id\n    name\n  }\n}"
): (typeof documents)["fragment RegularPost on Post {\n  id\n  title\n  content\n  points\n  hasVoted\n  creator {\n    id\n    username\n  }\n  club {\n    id\n    name\n  }\n}"];
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
  source: "mutation createClub($description: String!, $name: String!) {\n  createClub(description: $description, name: $name) {\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation createClub($description: String!, $name: String!) {\n  createClub(description: $description, name: $name) {\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation CreateClubEvent($clubId: Float!, $duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!) {\n  createClubEvent(\n    clubId: $clubId\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n  ) {\n    id\n    title\n  }\n}"
): (typeof documents)["mutation CreateClubEvent($clubId: Float!, $duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!) {\n  createClubEvent(\n    clubId: $clubId\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n  ) {\n    id\n    title\n  }\n}"];
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
  source: "mutation CreatePost($clubId: Int!, $content: String!, $title: String!) {\n  createPost(clubId: $clubId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}"
): (typeof documents)["mutation CreatePost($clubId: Int!, $content: String!, $title: String!) {\n  createPost(clubId: $clubId, content: $content, title: $title) {\n    errors {\n      field\n      message\n    }\n    post {\n      id\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation DeleteClubEvent($id: Float!) {\n  deleteClubEvent(id: $id)\n}"
): (typeof documents)["mutation DeleteClubEvent($id: Float!) {\n  deleteClubEvent(id: $id)\n}"];
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
  source: "mutation DeletePost($deletePostId: Int!) {\n  deletePost(id: $deletePostId)\n}"
): (typeof documents)["mutation DeletePost($deletePostId: Int!) {\n  deletePost(id: $deletePostId)\n}"];
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
  source: "mutation JoinClub($clubId: Int!) {\n  joinClub(id: $clubId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation JoinClub($clubId: Int!) {\n  joinClub(id: $clubId) {\n    ok\n    errors {\n      field\n      message\n    }\n  }\n}"];
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
  source: "mutation UpdateClubEvent($duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!, $id: Float!) {\n  updateClubEvent(\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n    id: $id\n  ) {\n    id\n    title\n    description\n    meetingLink\n    date\n  }\n}"
): (typeof documents)["mutation UpdateClubEvent($duration: String!, $meetingLink: String!, $date: DateTime!, $description: String!, $title: String!, $id: Float!) {\n  updateClubEvent(\n    duration: $duration\n    meetingLink: $meetingLink\n    date: $date\n    description: $description\n    title: $title\n    id: $id\n  ) {\n    id\n    title\n    description\n    meetingLink\n    date\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "mutation UpdatePost($updatePostId: Float!, $title: String, $content: String) {\n  updatePost(id: $updatePostId, title: $title, content: $content) {\n    post {\n      id\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"
): (typeof documents)["mutation UpdatePost($updatePostId: Float!, $title: String, $content: String) {\n  updatePost(id: $updatePostId, title: $title, content: $content) {\n    post {\n      id\n    }\n    errors {\n      field\n      message\n    }\n  }\n}"];
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
  source: "query Club($clubId: Float!) {\n  club(id: $clubId) {\n    id\n    name\n    description\n    dateCreated\n    hasJoined\n  }\n}"
): (typeof documents)["query Club($clubId: Float!) {\n  club(id: $clubId) {\n    id\n    name\n    description\n    dateCreated\n    hasJoined\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ClubEventsWithId($limit: Float!, $clubId: Float!) {\n  clubEventsWithId(limit: $limit, clubId: $clubId) {\n    id\n    title\n    description\n    duration\n    date\n  }\n}"
): (typeof documents)["query ClubEventsWithId($limit: Float!, $clubId: Float!) {\n  clubEventsWithId(limit: $limit, clubId: $clubId) {\n    id\n    title\n    description\n    duration\n    date\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ClubPosts($limit: Int!, $clubId: Float!, $cursor: String) {\n  clubPosts(limit: $limit, clubId: $clubId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query ClubPosts($limit: Int!, $clubId: Float!, $cursor: String) {\n  clubPosts(limit: $limit, clubId: $clubId, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      creator {\n        username\n      }\n      points\n      hasVoted\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query ClubEvent($clubEventId: Float!) {\n  clubEvent(id: $clubEventId) {\n    id\n    title\n    description\n    duration\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n      hasJoined\n    }\n    attendees {\n      id\n      username\n    }\n    date\n    meetingLink\n  }\n}"
): (typeof documents)["query ClubEvent($clubEventId: Float!) {\n  clubEvent(id: $clubEventId) {\n    id\n    title\n    description\n    duration\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n      hasJoined\n    }\n    attendees {\n      id\n      username\n    }\n    date\n    meetingLink\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query FeedPosts($limit: Int!, $cursor: String) {\n  myClubsPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      club {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}"
): (typeof documents)["query FeedPosts($limit: Int!, $cursor: String) {\n  myClubsPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      title\n      content\n      points\n      hasVoted\n      club {\n        id\n        name\n      }\n      creator {\n        username\n      }\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query LatestPosts($limit: Int!, $cursor: String) {\n  latestPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"];
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
  source: "query myClubs {\n  meWithClubs {\n    memberClubs {\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["query myClubs {\n  meWithClubs {\n    memberClubs {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PopularClubs {\n  popularClubs {\n    id\n    name\n    numberOfMembers\n  }\n}"
): (typeof documents)["query PopularClubs {\n  popularClubs {\n    id\n    name\n    numberOfMembers\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PopularEvents {\n  popularEvents {\n    id\n    title\n    duration\n    date\n    club {\n      id\n      name\n    }\n  }\n}"
): (typeof documents)["query PopularEvents {\n  popularEvents {\n    id\n    title\n    duration\n    date\n    club {\n      id\n      name\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"
): (typeof documents)["query PopularPosts($limit: Int!, $cursor: Int) {\n  popularPosts(limit: $limit, cursor: $cursor) {\n    errors {\n      field\n      message\n    }\n    hasMore\n    posts {\n      id\n      content\n      club {\n        id\n        name\n      }\n      creator {\n        id\n        username\n      }\n      title\n      points\n      hasVoted\n    }\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: "query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}"
): (typeof documents)["query Post($postId: Float!) {\n  post(id: $postId) {\n    id\n    title\n    content\n    hasVoted\n    isOwner\n    points\n    joinStatus\n    creator {\n      id\n      username\n    }\n    club {\n      id\n      name\n      description\n      dateCreated\n    }\n  }\n}"];
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
