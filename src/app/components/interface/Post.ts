
export interface Post {
  id: string,
  userId: string,
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
      commentId: string
    }
  ]
}
