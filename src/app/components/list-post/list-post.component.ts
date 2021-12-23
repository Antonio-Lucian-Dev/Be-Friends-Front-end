import { Component, OnInit } from '@angular/core';
import { Post } from '../interface/Post';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  posts: Post[] = [
    {
      post: {
        "id": 21,
        "userId": 1,
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
            "commentId": 89
          }
        ]
      },
      user: {
        "id": '1',
        "profileImage": "./assets/img/men-1.jpg",
        "firstName": "Andrei",
        "lastName": "Liviu",
        "email": "test@gmail.com",
        "password": "123",
        "birthday": "19/05/1998",
        "createdAt": new Date(2018, 11, 24, 10, 33, 30, 0),
        "bornLocation": "New York, US",
        "liveLocation": "Los Angeles, US"
      }
    },
    {
      post: {
        "id": 21,
        "userId": 1,
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
            "commentId": 89
          }
        ]
      },
      user: {
        "id": '1',
        "profileImage": "./assets/img/men-1.jpg",
        "firstName": "Andrei",
        "lastName": "Liviu",
        "email": "test@gmail.com",
        "password": "123",
        "birthday": "19/05/1998",
        "createdAt": new Date(2018, 11, 24, 10, 33, 30, 0),
        "bornLocation": "New York, US",
        "liveLocation": "Los Angeles, US"
      }
    },
    {
      post: {
        "id": 21,
        "userId": 1,
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
            "commentId": 89
          }
        ]
      },
      user: {
        "id": '1',
        "profileImage": "./assets/img/men-1.jpg",
        "firstName": "Andrei",
        "lastName": "Liviu",
        "email": "test@gmail.com",
        "password": "123",
        "birthday": "19/05/1998",
        "createdAt": new Date(2018, 11, 24, 10, 33, 30, 0),
        "bornLocation": "New York, US",
        "liveLocation": "Los Angeles, US"
      }
    }
  ];

constructor() { }

ngOnInit(): void {
}

getAllPosts(): void {}

getActualUserOfCurrentPost(): void {

}

}
