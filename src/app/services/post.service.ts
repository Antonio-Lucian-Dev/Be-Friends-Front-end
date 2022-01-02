import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { Post } from '../components/interface/Post';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  @Output() isPostCreated = new EventEmitter<any>();
  @Output() postLiked = new EventEmitter<any>();

  CONNECTION_URL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.CONNECTION_URL}/posts`);
  }

  getPostByUserId(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.CONNECTION_URL}/posts`).pipe(
      map((posts: Post[]) => posts.filter(post => post.userId == userId))
    );
  }

  likeAPost(post: Post): Observable<any> {
    return this.http.patch<any>(`${this.CONNECTION_URL}/posts/${post.id}`, post);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post<any>(`${this.CONNECTION_URL}/posts`, post);
  }

  deletePostById(postId: string): Observable<any> {
    return this.http.delete<any>(`${this.CONNECTION_URL}/posts/${postId}`);
  }
}
