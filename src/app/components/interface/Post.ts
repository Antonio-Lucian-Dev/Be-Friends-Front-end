import { User } from "./User";

export interface Post {
  post: {
    id: number,
    userId: number,
    description: string,
    image: [
      {
        id: number,
        value: string
      }
    ],
    createdAt: string,
    likes: number,
    comments: [
      {
        commentId: number
      }
    ]
  },
  user: User
}
