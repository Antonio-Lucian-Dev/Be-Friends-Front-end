import { AuthService } from './../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Post } from '../components/interface/Post';
import { User } from '../components/interface/User';

@Injectable({
  providedIn: 'root'
})
export class PostService {

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
    console.log(post)
    return this.http.patch<any>(`${this.CONNECTION_URL}/posts/${post.id}`, post);
  }

  /* uploadFiles(file: File, userId: string, post: Post): Observable<any> {
    this.authService.getUserById(userId).subscribe(user => {
      this.http.post<any>(`${this.CONNECTION_URL}/posts`, post);
    })
  } */
}
