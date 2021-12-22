import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { url } from 'inspector';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private URL = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  getAllPosts(): Observable<any[]> {
    return this.http.get<any[]>(`${url}/posts`);
  }
}
