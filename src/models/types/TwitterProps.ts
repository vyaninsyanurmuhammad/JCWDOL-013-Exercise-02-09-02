export type Twitter = {
  users: User[];
  posts: Post[];
};

export type Post = {
  id: string;
  name: string;
  twitt: string;
  twitted_by: string;
  likes: string[];
  comments: Comment[];
  created_at: string;
};

export type Comment = {
  from: string;
  name: string;
  comment: string;
};

export type User = {
  id: string;
  name: string;
  password: string;
  following: string[];
  followed: string[];
};
