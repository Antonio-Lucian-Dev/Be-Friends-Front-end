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

  constructor(private http: HttpClient) {
    this.CONNECTION_URL = "http://localhost:3000";
  }

  getAllPosts(): Observable<any[]> {
    return this.http.get<Post[]>(`${this.CONNECTION_URL}/posts`);
  }

  getPostByUserId(userId: string): Observable<Post[]> {
    let userPosts: Post[] = [];
    this.http.get<Post[]>(`${this.CONNECTION_URL}/posts`).subscribe((posts: Post[]) => {
      posts.forEach((post: Post) => {
        if(post.userId == userId) {
          userPosts.push(post);
        }
      });
    });
    return of(userPosts);
  }
}
