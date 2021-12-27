
export interface Post {
  id: string,
  userId: string,
  description: string,
  image: Image[],
  createdAt: string,
  likes: string[],
  comments: [
    {
      commentId: string
    }
  ]
}

export interface Image {
    id: number,
    value: string
}
