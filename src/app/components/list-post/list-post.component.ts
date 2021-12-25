import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { User } from './../interface/User';
import { Component, OnInit } from '@angular/core';
import { Post } from '../interface/Post';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  posts: any[] = [
  /*  {
      post: {
        "id": '21',
        "userId": '1',
        "description": "Ce zi frumoasa!",
        "image": [
          {
            "id": 56,
            "value": "./assets/img/girl-2.jpg"
          }
        ],
        "createdAt": "24 h",
        "likes": 23,
        "comments": [
          {
            "commentId": '89'
          }
        ]
      },
    },
    {
      post: {
        "id": '21',
        "userId": '1',
        "description": "Ce zi frumoasa!",
        "image": [
          {
            "id": 56,
            "value": "./assets/img/girl-1.jpg"
          }
        ],
        "createdAt": "24 h",
        "likes": 23,
        "comments": [
          {
            "commentId": '89'
          }
        ]
      },
    },
    {
      post: {
        "id": '21',
        "userId": '1',
        "description": "Ce zi frumoasa!",
        "image": [
          {
            "id": 56,
            "value": "./assets/img/lambo.jpg"
          }
        ],
        "createdAt": "24 h",
        "likes": 23,
        "comments": [
          {
            "commentId": '89'
          }
        ]
      },
    } */
  ];

  user: User[] = [];

constructor(private postService: PostService, private authService: AuthService) { }

ngOnInit(): void {
}

getAllPosts(): void {
 this.postService.getAllPosts().subscribe(posts => {
   posts.forEach(post => {

   })
 })
}

getActualUserOfCurrentPost(): void {

}

}
