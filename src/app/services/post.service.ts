import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Observable, of } from 'rxjs';
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
    let userPosts: Post[] = [];
    this.http.get<Post[]>(`${this.CONNECTION_URL}/posts`).subscribe((posts: Post[]) => {
      posts.forEach((post: Post) => {
        if (post.userId == userId) {
          userPosts.push(post);
        }
      });
    });
    return of(userPosts);
  }

  likeAPost(post: Post): Observable<any> {
    return this.http.patch<any>(`${this.CONNECTION_URL}/posts/${post.id}`, post);
  }

  createPost(post: Post): Observable<any> {
    return this.http.post<any>(`${this.CONNECTION_URL}/posts`, post);
  }

  deletePostById(postId: string): Observable<boolean> {
    this.http.delete<any>(`${this.CONNECTION_URL}/posts/${postId}`);
    return of(true);
  }
}
