import { Article, Comment, User } from "@prisma/client";
export type CommentsWithUser = Comment & { user: User };
export type SingleArticle = Article & { comments: CommentsWithUser[] };
export type JWTPaylod = {
  id: number;
  isAdmin: boolean;
  userName: string;
};
