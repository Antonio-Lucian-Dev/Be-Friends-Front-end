import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { User } from './../interface/User';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Post, Image } from '../interface/Post';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy {

  @Input() myProfile: User | undefined;

  // We can emit to profile component our images to be displayed on photo section
  @Output() imageListEmitter = new EventEmitter<Image[]>();

  // Modified posts with user added on it
  posts: any[] = [];
  images: Image[] = [];

  // A list of all users
  allUsers: User[] = [];

  userSubscription: Subscription | undefined;
  postSubscription: Subscription | undefined;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    // Daca este profilul meu dami doar postarile mele
    if (this.myProfile) {
      this.getMyPosts(this.myProfile);
    } else {
       // Daca nu dami toate postarile
      this.userSubscription = this.authService.getAllUsers().subscribe(users => {
        this.allUsers = users;
        this.getUsersPost(users);
        this.userSubscription?.unsubscribe();
      });
    }


    // Emitte-uri pentru a face un fel de refresh in postarile noastre

    // When a post is created this event will be subscribed
    this.postSubscription = this.postService.isPostCreated.subscribe(post => {
      const actualUser = this.allUsers.find(user => user.id == post.userId);
      if(actualUser) {
        this.modifyPost(post, actualUser);
      }
      this.postSubscription?.unsubscribe();
    });

    // When a post receive a like this event will be subscribed
    this.postSubscription = this.postService.postLiked.subscribe(postLiked => {
      this.posts.splice(this.posts.indexOf(postLiked.id), 1, postLiked);
      this.postSubscription?.unsubscribe();
    });
  }

  getUsersPost(users: User[]): void {
    this.posts = [];
    // If there is no new post posted, will get the entire posts
    this.postSubscription = this.postService.getAllPosts().subscribe(posts => {
      posts.forEach(post => {
        const actualUser = users.find(user => user.id == post.userId);
        if (actualUser) {
          this.modifyPost(post, actualUser);
        }
      }, this.postSubscription?.unsubscribe);
    });
  }

  getMyPosts(user: User): void {
    this.posts = [];
    this.postSubscription = this.postService.getPostByUserId(this.myProfile!.id).subscribe(posts => {
      posts.forEach(post => {
        this.modifyPost(post, user);
      });
    });
  }

  modifyPost(post: Post, user: User): void {
    let modifiedPost = {
      id: '',
      user: {
        id: '',
        profileImage: '',
        firstName: '',
        lastName: '',
        birthday: '',
        email: '',
        password: '',
        createdAt: new Date(),
        bornLocation: '',
        liveLocation: ''
      },
      description: '',
      image: [] as any[],
      createdAt: new Date(),
      likes: [] as any,
      comments: [] as any,
    };
    modifiedPost.id = post.id;
    modifiedPost.user = user;
    modifiedPost.description = post.description;
    modifiedPost.image = post.image;
    modifiedPost.createdAt = post.createdAt;
    modifiedPost.likes = post.likes;
    modifiedPost.comments = post.comments;

    this.posts.unshift(modifiedPost);
  }

  // Pentru imagini fac un find pe posts care se regaseste cu userul actual

  findImagesByUserId(userId: string): void {
    const usersPost = this.posts.filter(post => post.userId == userId);
    usersPost.filter(post => post.image.lenght > 0).forEach(post => this.images.push(...post.image));
    this.imageListEmitter.emit(this.images);
  }


  likeAction(post: Post): void {
    this.userSubscription = this.authService.getUserFromLocal().subscribe(user => {
      if (user) {
        if (post.likes.includes(user.id)) {
          post.likes.splice(post.likes.indexOf(user.id), 1);
        } else {
          post.likes.push(user.id);
        }
        this.postSubscription = this.postService.likeAPost(post).subscribe(() => {
          this.postSubscription?.unsubscribe();
          this.userSubscription?.unsubscribe();
        });
      }
    });
  }

  deletePost(postId: string): void {
    this.postService.deletePostById(postId).subscribe();
  }

  /*
  verifyIfIAmTheUser(userId: string): boolean {
    let myProfile = JSON.parse(localStorage.getItem('user') || '{}');
    return userId === myProfile.id;
  } */

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.postSubscription?.unsubscribe();
  }

}
