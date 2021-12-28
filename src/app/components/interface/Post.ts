
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
    id: string,
    value: string | ArrayBuffer | null
}
