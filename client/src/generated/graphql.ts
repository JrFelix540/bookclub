/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: { input: any; output: any };
};

export type AuthResponse = {
  __typename?: "AuthResponse";
  errors?: Maybe<Array<FieldError>>;
  loggedInUser?: Maybe<LoggedInUser>;
};

export type AuthenticatedUser = {
  __typename?: "AuthenticatedUser";
  id?: Maybe<Scalars["Float"]["output"]>;
  username?: Maybe<Scalars["String"]["output"]>;
};

export type BooleanFieldResponse = {
  __typename?: "BooleanFieldResponse";
  errors?: Maybe<Array<FieldError>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type BooleanResponse = {
  __typename?: "BooleanResponse";
  errors?: Maybe<Array<FieldError>>;
  ok?: Maybe<Scalars["Boolean"]["output"]>;
};

export type Club = {
  __typename?: "Club";
  createdAt: Scalars["DateTime"]["output"];
  creator: User;
  creatorId: Scalars["Int"]["output"];
  dateCreated: Scalars["String"]["output"];
  description: Scalars["String"]["output"];
  events: Array<ClubEvent>;
  hasJoined?: Maybe<Scalars["Boolean"]["output"]>;
  id: Scalars["Float"]["output"];
  memberIds: Array<Scalars["Float"]["output"]>;
  members: Array<User>;
  name: Scalars["String"]["output"];
  numberOfMembers: Scalars["Int"]["output"];
  posts: Array<Post>;
  updatedAt: Scalars["DateTime"]["output"];
};

export type ClubEvent = {
  __typename?: "ClubEvent";
  attendees: Array<User>;
  club: Club;
  createdAt: Scalars["DateTime"]["output"];
  creator: User;
  date: Scalars["DateTime"]["output"];
  description: Scalars["String"]["output"];
  duration: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  meetingLink: Scalars["String"]["output"];
  title: Scalars["String"]["output"];
  updatedAt: Scalars["DateTime"]["output"];
};

export type ClubResponse = {
  __typename?: "ClubResponse";
  club?: Maybe<Club>;
  errors?: Maybe<Array<FieldError>>;
};

export type Comment = {
  __typename?: "Comment";
  commentIds: Array<Scalars["Int"]["output"]>;
  commentUpvotes: CommentUpvote;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  creator: User;
  hasVoted: Scalars["Boolean"]["output"];
  id: Scalars["Float"]["output"];
  isOwner: Scalars["Boolean"]["output"];
  parentCommentId: Scalars["Int"]["output"];
  points: Scalars["Float"]["output"];
  post: Post;
  updatedAt: Scalars["String"]["output"];
  voteStatus?: Maybe<Scalars["Int"]["output"]>;
};

export type CommentUpvote = {
  __typename?: "CommentUpvote";
  comment: Comment;
  commentId: Scalars["Int"]["output"];
  creator: User;
  creatorId: Scalars["Int"]["output"];
  value: Scalars["Int"]["output"];
};

export type CommentUpvoteResponse = {
  __typename?: "CommentUpvoteResponse";
  commentUpvote?: Maybe<CommentUpvote>;
  errors?: Maybe<Array<FieldError>>;
};

export type FieldError = {
  __typename?: "FieldError";
  field: Scalars["String"]["output"];
  message: Scalars["String"]["output"];
};

export type LoggedInUser = {
  __typename?: "LoggedInUser";
  accessToken: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  username: Scalars["String"]["output"];
};

export type Mutation = {
  __typename?: "Mutation";
  attendEvent: Scalars["Boolean"]["output"];
  createClub: ClubResponse;
  createClubEvent: ClubEvent;
  createComment: UserCommentResponse;
  createPost: PostResponse;
  deleteClubEvent: Scalars["Boolean"]["output"];
  deleteComment: Scalars["Boolean"]["output"];
  deletePost: Scalars["Boolean"]["output"];
  forgetPassword: BooleanResponse;
  joinClub?: Maybe<BooleanFieldResponse>;
  leaveClub: BooleanFieldResponse;
  resetPassword: BooleanResponse;
  signOut: Scalars["Boolean"]["output"];
  signin: AuthResponse;
  signup: AuthResponse;
  updateClubEvent: ClubEvent;
  updatePost: PostResponse;
  vote?: Maybe<UpvoteResponse>;
  voteComment: CommentUpvoteResponse;
};

export type MutationAttendEventArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationCreateClubArgs = {
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
};

export type MutationCreateClubEventArgs = {
  clubId: Scalars["Float"]["input"];
  date: Scalars["DateTime"]["input"];
  description: Scalars["String"]["input"];
  duration: Scalars["String"]["input"];
  meetingLink: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationCreateCommentArgs = {
  content: Scalars["String"]["input"];
  postId: Scalars["Float"]["input"];
};

export type MutationCreatePostArgs = {
  clubId: Scalars["Int"]["input"];
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationDeleteClubEventArgs = {
  id: Scalars["Float"]["input"];
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars["Float"]["input"];
};

export type MutationDeletePostArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationForgetPasswordArgs = {
  email: Scalars["String"]["input"];
};

export type MutationJoinClubArgs = {
  id: Scalars["Int"]["input"];
};

export type MutationLeaveClubArgs = {
  clubId: Scalars["Float"]["input"];
};

export type MutationResetPasswordArgs = {
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
};

export type MutationSigninArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationSignupArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
};

export type MutationUpdateClubEventArgs = {
  date: Scalars["DateTime"]["input"];
  description: Scalars["String"]["input"];
  duration: Scalars["String"]["input"];
  id: Scalars["Float"]["input"];
  meetingLink: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationUpdatePostArgs = {
  content: Scalars["String"]["input"];
  id: Scalars["Float"]["input"];
  title: Scalars["String"]["input"];
};

export type MutationVoteArgs = {
  postId: Scalars["Int"]["input"];
  value: Scalars["Int"]["input"];
};

export type MutationVoteCommentArgs = {
  commentId: Scalars["Float"]["input"];
  value: Scalars["Int"]["input"];
};

export type PaginatedPosts = {
  __typename?: "PaginatedPosts";
  errors?: Maybe<Array<FieldError>>;
  hasMore: Scalars["Boolean"]["output"];
  posts?: Maybe<Array<Post>>;
};

export type Post = {
  __typename?: "Post";
  club: Club;
  clubId: Scalars["Int"]["output"];
  comments: Array<Comment>;
  content: Scalars["String"]["output"];
  createdAt: Scalars["String"]["output"];
  creator: User;
  creatorId: Scalars["Int"]["output"];
  hasVoted?: Maybe<Scalars["Int"]["output"]>;
  id: Scalars["Float"]["output"];
  isOwner?: Maybe<Scalars["Boolean"]["output"]>;
  joinStatus?: Maybe<Scalars["Boolean"]["output"]>;
  points: Scalars["Int"]["output"];
  postUpvotes?: Maybe<Array<PostUpvote>>;
  title: Scalars["String"]["output"];
  updatedAt: Scalars["String"]["output"];
  voteStatus?: Maybe<Scalars["Int"]["output"]>;
};

export type PostResponse = {
  __typename?: "PostResponse";
  errors?: Maybe<Array<FieldError>>;
  post?: Maybe<Post>;
};

export type PostUpvote = {
  __typename?: "PostUpvote";
  creator: User;
  creatorId: Scalars["Int"]["output"];
  post: Post;
  postId: Scalars["Int"]["output"];
  value: Scalars["Int"]["output"];
};

export type Query = {
  __typename?: "Query";
  allClubs: Array<Club>;
  club: Club;
  clubEvent: ClubEvent;
  clubEventsWithId: Array<ClubEvent>;
  clubPosts?: Maybe<PaginatedPosts>;
  clubsWithIds: Array<Club>;
  latestPosts: PaginatedPosts;
  me?: Maybe<AuthenticatedUser>;
  meWithClubs?: Maybe<User>;
  myClubsPosts?: Maybe<PaginatedPosts>;
  popularClubs: Array<Club>;
  popularEvents: Array<ClubEvent>;
  popularPosts?: Maybe<PaginatedPosts>;
  post: Post;
  postComments?: Maybe<Array<Comment>>;
  postWithIds: Array<Post>;
  users: Array<User>;
};

export type QueryClubArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryClubEventArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryClubEventsWithIdArgs = {
  clubId: Scalars["Float"]["input"];
  limit: Scalars["Float"]["input"];
};

export type QueryClubPostsArgs = {
  clubId: Scalars["Float"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
};

export type QueryLatestPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
};

export type QueryMyClubsPostsArgs = {
  cursor?: InputMaybe<Scalars["String"]["input"]>;
  limit: Scalars["Int"]["input"];
};

export type QueryPopularPostsArgs = {
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
  limit: Scalars["Int"]["input"];
};

export type QueryPostArgs = {
  id: Scalars["Float"]["input"];
};

export type QueryPostCommentsArgs = {
  postId: Scalars["Float"]["input"];
};

export type UpvoteResponse = {
  __typename?: "UpvoteResponse";
  errors?: Maybe<Array<FieldError>>;
  upvote?: Maybe<PostUpvote>;
};

export type User = {
  __typename?: "User";
  comments: Array<Comment>;
  createdAt: Scalars["String"]["output"];
  createdClubs: Array<Club>;
  createdEvents: Array<ClubEvent>;
  email: Scalars["String"]["output"];
  id: Scalars["Float"]["output"];
  memberClubs: Array<Club>;
  password: Scalars["String"]["output"];
  posts: Array<Post>;
  updatedAt: Scalars["String"]["output"];
  upvotes: Array<PostUpvote>;
  username: Scalars["String"]["output"];
};

export type UserCommentResponse = {
  __typename?: "UserCommentResponse";
  comment?: Maybe<Comment>;
  errors?: Maybe<Array<FieldError>>;
};

export type RegularPostFragment = {
  __typename?: "Post";
  id: number;
  title: string;
  content: string;
  points: number;
  hasVoted?: number | null;
  creator: { __typename?: "User"; id: number; username: string };
  club: { __typename?: "Club"; id: number; name: string };
} & { " $fragmentName"?: "RegularPostFragment" };

export type RegularUserFragment = {
  __typename?: "User";
  id: number;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
} & { " $fragmentName"?: "RegularUserFragment" };

export type CreateClubMutationVariables = Exact<{
  description: Scalars["String"]["input"];
  name: Scalars["String"]["input"];
}>;

export type CreateClubMutation = {
  __typename?: "Mutation";
  createClub: {
    __typename?: "ClubResponse";
    club?: {
      __typename?: "Club";
      id: number;
      name: string;
      description: string;
      dateCreated: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type CreateClubEventMutationVariables = Exact<{
  clubId: Scalars["Float"]["input"];
  duration: Scalars["String"]["input"];
  meetingLink: Scalars["String"]["input"];
  date: Scalars["DateTime"]["input"];
  description: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
}>;

export type CreateClubEventMutation = {
  __typename?: "Mutation";
  createClubEvent: { __typename?: "ClubEvent"; id: number; title: string };
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars["Float"]["input"];
  content: Scalars["String"]["input"];
}>;

export type CreateCommentMutation = {
  __typename?: "Mutation";
  createComment: {
    __typename?: "UserCommentResponse";
    comment?: {
      __typename?: "Comment";
      id: number;
      points: number;
      content: string;
      createdAt: string;
    } | null;
  };
};

export type CreatePostMutationVariables = Exact<{
  clubId: Scalars["Int"]["input"];
  content: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
}>;

export type CreatePostMutation = {
  __typename?: "Mutation";
  createPost: {
    __typename?: "PostResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    post?: { __typename?: "Post"; id: number } | null;
  };
};

export type DeleteClubEventMutationVariables = Exact<{
  id: Scalars["Float"]["input"];
}>;

export type DeleteClubEventMutation = {
  __typename?: "Mutation";
  deleteClubEvent: boolean;
};

export type DeleteCommentMutationVariables = Exact<{
  commentId: Scalars["Float"]["input"];
}>;

export type DeleteCommentMutation = {
  __typename?: "Mutation";
  deleteComment: boolean;
};

export type DeletePostMutationVariables = Exact<{
  deletePostId: Scalars["Int"]["input"];
}>;

export type DeletePostMutation = {
  __typename?: "Mutation";
  deletePost: boolean;
};

export type ForgetPasswordMutationVariables = Exact<{
  email: Scalars["String"]["input"];
}>;

export type ForgetPasswordMutation = {
  __typename?: "Mutation";
  forgetPassword: { __typename?: "BooleanResponse"; ok?: boolean | null };
};

export type JoinClubMutationVariables = Exact<{
  clubId: Scalars["Int"]["input"];
}>;

export type JoinClubMutation = {
  __typename?: "Mutation";
  joinClub?: {
    __typename?: "BooleanFieldResponse";
    ok?: boolean | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  } | null;
};

export type ResetPasswordMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  token: Scalars["String"]["input"];
}>;

export type ResetPasswordMutation = {
  __typename?: "Mutation";
  resetPassword: {
    __typename?: "BooleanResponse";
    ok?: boolean | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type SignOutMutationVariables = Exact<{ [key: string]: never }>;

export type SignOutMutation = { __typename?: "Mutation"; signOut: boolean };

export type SignInMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  signin: {
    __typename?: "AuthResponse";
    loggedInUser?: {
      __typename?: "LoggedInUser";
      id: number;
      accessToken: string;
      username: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type SignupMutationVariables = Exact<{
  password: Scalars["String"]["input"];
  email: Scalars["String"]["input"];
  username: Scalars["String"]["input"];
}>;

export type SignupMutation = {
  __typename?: "Mutation";
  signup: {
    __typename?: "AuthResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    loggedInUser?: {
      __typename?: "LoggedInUser";
      id: number;
      accessToken: string;
      username: string;
    } | null;
  };
};

export type UpdateClubEventMutationVariables = Exact<{
  duration: Scalars["String"]["input"];
  meetingLink: Scalars["String"]["input"];
  date: Scalars["DateTime"]["input"];
  description: Scalars["String"]["input"];
  title: Scalars["String"]["input"];
  id: Scalars["Float"]["input"];
}>;

export type UpdateClubEventMutation = {
  __typename?: "Mutation";
  updateClubEvent: {
    __typename?: "ClubEvent";
    id: number;
    title: string;
    description: string;
    meetingLink: string;
    duration: string;
    date: any;
  };
};

export type UpdatePostMutationVariables = Exact<{
  updatePostId: Scalars["Float"]["input"];
  title: Scalars["String"]["input"];
  content: Scalars["String"]["input"];
}>;

export type UpdatePostMutation = {
  __typename?: "Mutation";
  updatePost: {
    __typename?: "PostResponse";
    post?: {
      __typename?: "Post";
      id: number;
      title: string;
      content: string;
    } | null;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
  };
};

export type VoteMutationVariables = Exact<{
  value: Scalars["Int"]["input"];
  postId: Scalars["Int"]["input"];
}>;

export type VoteMutation = {
  __typename?: "Mutation";
  vote?: {
    __typename?: "UpvoteResponse";
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    upvote?: {
      __typename?: "PostUpvote";
      creatorId: number;
      postId: number;
      value: number;
    } | null;
  } | null;
};

export type ClubQueryVariables = Exact<{
  clubId: Scalars["Float"]["input"];
}>;

export type ClubQuery = {
  __typename?: "Query";
  club: {
    __typename?: "Club";
    id: number;
    name: string;
    description: string;
    dateCreated: string;
    hasJoined?: boolean | null;
  };
};

export type ClubEventsWithIdQueryVariables = Exact<{
  limit: Scalars["Float"]["input"];
  clubId: Scalars["Float"]["input"];
}>;

export type ClubEventsWithIdQuery = {
  __typename?: "Query";
  clubEventsWithId: Array<{
    __typename?: "ClubEvent";
    id: number;
    title: string;
    description: string;
    duration: string;
    date: any;
  }>;
};

export type ClubPostsQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  clubId: Scalars["Float"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type ClubPostsQuery = {
  __typename?: "Query";
  clubPosts?: {
    __typename?: "PaginatedPosts";
    hasMore: boolean;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    posts?: Array<{
      __typename?: "Post";
      id: number;
      title: string;
      content: string;
      points: number;
      hasVoted?: number | null;
      creator: { __typename?: "User"; username: string };
    }> | null;
  } | null;
};

export type ClubEventQueryVariables = Exact<{
  clubEventId: Scalars["Float"]["input"];
}>;

export type ClubEventQuery = {
  __typename?: "Query";
  clubEvent: {
    __typename?: "ClubEvent";
    id: number;
    title: string;
    description: string;
    duration: string;
    date: any;
    meetingLink: string;
    creator: { __typename?: "User"; id: number; username: string };
    club: {
      __typename?: "Club";
      id: number;
      name: string;
      description: string;
      dateCreated: string;
      hasJoined?: boolean | null;
    };
    attendees: Array<{ __typename?: "User"; id: number; username: string }>;
  };
};

export type FeedPostsQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type FeedPostsQuery = {
  __typename?: "Query";
  myClubsPosts?: {
    __typename?: "PaginatedPosts";
    hasMore: boolean;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    posts?: Array<{
      __typename?: "Post";
      id: number;
      title: string;
      content: string;
      points: number;
      hasVoted?: number | null;
      club: { __typename?: "Club"; id: number; name: string };
      creator: { __typename?: "User"; username: string };
    }> | null;
  } | null;
};

export type LatestPostsQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["String"]["input"]>;
}>;

export type LatestPostsQuery = {
  __typename?: "Query";
  latestPosts: {
    __typename?: "PaginatedPosts";
    hasMore: boolean;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    posts?: Array<{
      __typename?: "Post";
      id: number;
      content: string;
      title: string;
      points: number;
      hasVoted?: number | null;
      club: { __typename?: "Club"; id: number; name: string };
      creator: { __typename?: "User"; id: number; username: string };
    }> | null;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  me?: {
    __typename?: "AuthenticatedUser";
    id?: number | null;
    username?: string | null;
  } | null;
};

export type MyClubsQueryVariables = Exact<{ [key: string]: never }>;

export type MyClubsQuery = {
  __typename?: "Query";
  meWithClubs?: {
    __typename?: "User";
    memberClubs: Array<{ __typename?: "Club"; id: number; name: string }>;
  } | null;
};

export type PopularClubsQueryVariables = Exact<{ [key: string]: never }>;

export type PopularClubsQuery = {
  __typename?: "Query";
  popularClubs: Array<{
    __typename?: "Club";
    id: number;
    name: string;
    numberOfMembers: number;
  }>;
};

export type PopularEventsQueryVariables = Exact<{ [key: string]: never }>;

export type PopularEventsQuery = {
  __typename?: "Query";
  popularEvents: Array<{
    __typename?: "ClubEvent";
    id: number;
    title: string;
    duration: string;
    date: any;
    club: { __typename?: "Club"; id: number; name: string };
  }>;
};

export type PopularPostsQueryVariables = Exact<{
  limit: Scalars["Int"]["input"];
  cursor?: InputMaybe<Scalars["Int"]["input"]>;
}>;

export type PopularPostsQuery = {
  __typename?: "Query";
  popularPosts?: {
    __typename?: "PaginatedPosts";
    hasMore: boolean;
    errors?: Array<{
      __typename?: "FieldError";
      field: string;
      message: string;
    }> | null;
    posts?: Array<{
      __typename?: "Post";
      id: number;
      content: string;
      title: string;
      points: number;
      hasVoted?: number | null;
      club: { __typename?: "Club"; id: number; name: string };
      creator: { __typename?: "User"; id: number; username: string };
    }> | null;
  } | null;
};

export type PostQueryVariables = Exact<{
  postId: Scalars["Float"]["input"];
}>;

export type PostQuery = {
  __typename?: "Query";
  post: {
    __typename?: "Post";
    id: number;
    title: string;
    content: string;
    hasVoted?: number | null;
    isOwner?: boolean | null;
    points: number;
    joinStatus?: boolean | null;
    creator: { __typename?: "User"; id: number; username: string };
    club: {
      __typename?: "Club";
      id: number;
      name: string;
      description: string;
      dateCreated: string;
    };
  };
};

export type PostCommentsQueryVariables = Exact<{
  postId: Scalars["Float"]["input"];
}>;

export type PostCommentsQuery = {
  __typename?: "Query";
  postComments?: Array<{
    __typename?: "Comment";
    id: number;
    content: string;
    isOwner: boolean;
    creator: { __typename?: "User"; id: number; username: string };
  }> | null;
};

export const RegularPostFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularPost" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "Post" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "title" } },
          { kind: "Field", name: { kind: "Name", value: "content" } },
          { kind: "Field", name: { kind: "Name", value: "points" } },
          { kind: "Field", name: { kind: "Name", value: "hasVoted" } },
          {
            kind: "Field",
            name: { kind: "Name", value: "creator" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
          {
            kind: "Field",
            name: { kind: "Name", value: "club" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegularPostFragment, unknown>;
export const RegularUserFragmentDoc = {
  kind: "Document",
  definitions: [
    {
      kind: "FragmentDefinition",
      name: { kind: "Name", value: "RegularUser" },
      typeCondition: {
        kind: "NamedType",
        name: { kind: "Name", value: "User" },
      },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "id" } },
          { kind: "Field", name: { kind: "Name", value: "username" } },
          { kind: "Field", name: { kind: "Name", value: "email" } },
          { kind: "Field", name: { kind: "Name", value: "createdAt" } },
          { kind: "Field", name: { kind: "Name", value: "updatedAt" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<RegularUserFragment, unknown>;
export const CreateClubDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "createClub" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "name" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createClub" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "name" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "name" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "club" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateCreated" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateClubMutation, CreateClubMutationVariables>;
export const CreateClubEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateClubEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "duration" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "meetingLink" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createClubEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "clubId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "duration" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "duration" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "meetingLink" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "meetingLink" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateClubEventMutation,
  CreateClubEventMutationVariables
>;
export const CreateCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreateComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "postId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "content" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "postId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "postId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "content" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "comment" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "points" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "createdAt" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateCommentMutation,
  CreateCommentMutationVariables
>;
export const CreatePostDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "CreatePost" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "content" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "createPost" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "clubId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "content" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "post" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreatePostMutation, CreatePostMutationVariables>;
export const DeleteClubEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteClubEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteClubEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteClubEventMutation,
  DeleteClubEventMutationVariables
>;
export const DeleteCommentDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeleteComment" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "commentId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deleteComment" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "commentId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "commentId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  DeleteCommentMutation,
  DeleteCommentMutationVariables
>;
export const DeletePostDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "DeletePost" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "deletePostId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "deletePost" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "deletePostId" },
                },
              },
            ],
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeletePostMutation, DeletePostMutationVariables>;
export const ForgetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ForgetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "forgetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ForgetPasswordMutation,
  ForgetPasswordMutationVariables
>;
export const JoinClubDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "JoinClub" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "joinClub" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "ok" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<JoinClubMutation, JoinClubMutationVariables>;
export const ResetPasswordDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "ResetPassword" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "token" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "resetPassword" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "token" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "token" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "ok" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ResetPasswordMutation,
  ResetPasswordMutationVariables
>;
export const SignOutDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignOut" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          { kind: "Field", name: { kind: "Name", value: "signOut" } },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignOutMutation, SignOutMutationVariables>;
export const SignInDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SignIn" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signin" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loggedInUser" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accessToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignInMutation, SignInMutationVariables>;
export const SignupDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Signup" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "password" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "email" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "username" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "signup" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "password" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "password" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "email" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "email" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "username" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "username" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "loggedInUser" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "accessToken" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<SignupMutation, SignupMutationVariables>;
export const UpdateClubEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdateClubEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "duration" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "meetingLink" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "date" } },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "DateTime" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "description" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: { kind: "Variable", name: { kind: "Name", value: "id" } },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updateClubEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "duration" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "duration" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "meetingLink" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "meetingLink" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "date" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "date" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "description" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "description" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "id" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "meetingLink" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  UpdateClubEventMutation,
  UpdateClubEventMutationVariables
>;
export const UpdatePostDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "UpdatePost" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "updatePostId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "title" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "content" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "updatePost" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "updatePostId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "title" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "title" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "content" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "content" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "post" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<UpdatePostMutation, UpdatePostMutationVariables>;
export const VoteDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "Vote" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "value" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "postId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "vote" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "value" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "value" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "postId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "postId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "upvote" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creatorId" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "postId" },
                      },
                      { kind: "Field", name: { kind: "Name", value: "value" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<VoteMutation, VoteMutationVariables>;
export const ClubDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Club" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "club" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "dateCreated" } },
                { kind: "Field", name: { kind: "Name", value: "hasJoined" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClubQuery, ClubQueryVariables>;
export const ClubEventsWithIdDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClubEventsWithId" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clubEventsWithId" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "clubId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  ClubEventsWithIdQuery,
  ClubEventsWithIdQueryVariables
>;
export const ClubPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClubPosts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clubPosts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "clubId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubId" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "hasMore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "posts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creator" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "points" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasVoted" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClubPostsQuery, ClubPostsQueryVariables>;
export const ClubEventDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "ClubEvent" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "clubEventId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "clubEvent" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "clubEventId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "description" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "creator" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "club" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateCreated" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasJoined" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "attendees" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                { kind: "Field", name: { kind: "Name", value: "meetingLink" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<ClubEventQuery, ClubEventQueryVariables>;
export const FeedPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "FeedPosts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "myClubsPosts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "hasMore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "posts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "points" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasVoted" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "club" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creator" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<FeedPostsQuery, FeedPostsQueryVariables>;
export const LatestPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "LatestPosts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "latestPosts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "hasMore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "posts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "club" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creator" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "points" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasVoted" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<LatestPostsQuery, LatestPostsQueryVariables>;
export const MeDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Me" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "me" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "username" } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MeQuery, MeQueryVariables>;
export const MyClubsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "myClubs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "meWithClubs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "memberClubs" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<MyClubsQuery, MyClubsQueryVariables>;
export const PopularClubsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PopularClubs" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "popularClubs" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "name" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "numberOfMembers" },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PopularClubsQuery, PopularClubsQueryVariables>;
export const PopularEventsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PopularEvents" },
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "popularEvents" },
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "duration" } },
                { kind: "Field", name: { kind: "Name", value: "date" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "club" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PopularEventsQuery, PopularEventsQueryVariables>;
export const PopularPostsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PopularPosts" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "limit" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
          },
        },
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "cursor" },
          },
          type: { kind: "NamedType", name: { kind: "Name", value: "Int" } },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "popularPosts" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "limit" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "limit" },
                },
              },
              {
                kind: "Argument",
                name: { kind: "Name", value: "cursor" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "cursor" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                {
                  kind: "Field",
                  name: { kind: "Name", value: "errors" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "field" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "message" },
                      },
                    ],
                  },
                },
                { kind: "Field", name: { kind: "Name", value: "hasMore" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "posts" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "content" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "club" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "creator" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "id" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "username" },
                            },
                          ],
                        },
                      },
                      { kind: "Field", name: { kind: "Name", value: "title" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "points" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "hasVoted" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PopularPostsQuery, PopularPostsQueryVariables>;
export const PostDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "Post" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "postId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "post" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "id" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "postId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "title" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "hasVoted" } },
                { kind: "Field", name: { kind: "Name", value: "isOwner" } },
                { kind: "Field", name: { kind: "Name", value: "points" } },
                { kind: "Field", name: { kind: "Name", value: "joinStatus" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "creator" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "club" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      { kind: "Field", name: { kind: "Name", value: "name" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "description" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "dateCreated" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostQuery, PostQueryVariables>;
export const PostCommentsDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "query",
      name: { kind: "Name", value: "PostComments" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "postId" },
          },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Float" } },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "postComments" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "postId" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "postId" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "id" } },
                { kind: "Field", name: { kind: "Name", value: "content" } },
                { kind: "Field", name: { kind: "Name", value: "isOwner" } },
                {
                  kind: "Field",
                  name: { kind: "Name", value: "creator" },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      { kind: "Field", name: { kind: "Name", value: "id" } },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "username" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<PostCommentsQuery, PostCommentsQueryVariables>;
