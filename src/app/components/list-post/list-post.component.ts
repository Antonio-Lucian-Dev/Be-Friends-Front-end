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

  @Input()
  userInput!: User;

  @Input() userId: string = "";
  @Output() images = new EventEmitter<Image[]>();

  private imagesFromPost: Image[] = [];

  private userSubscription: Subscription | undefined

  posts: any[] = [];

  user: User | undefined;
  private isImagesEmitted = false;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    if (this.userInput) {
      this.getUserPost(false);
    } else {
      this.getAllPosts(false);
    }


    // Retrieve my user
    this.authService.getUser().subscribe(user => this.user = user);

    // When a post is created this event will be subscribed
    this.postService.isPostCreated.subscribe(post => {
      if (this.userInput) {
        this.getUserPost(true, post);
      } else {
        this.getAllPosts(true, post);
      }
    });

    // When a post receive a like this event will be subscribed
    this.postService.postLiked.subscribe(dataPost => {

      if (this.userInput) {
        this.getUserPost(false);
      } else {
        // is not a new post, but a post to be splice the old in the array
        this.getAllPosts(false, dataPost);
      }
    });
  }

  getUserPost(isNewPost: boolean, specificPost?: Post): void {
    if (isNewPost && specificPost) {
      const newEditedPost = this.editPostBeforeCreate(specificPost);
      this.posts.unshift(newEditedPost);
      this.imagesFromPost.push(newEditedPost.image[0]);
      this.images.emit(this.imagesFromPost);
    } else {
      // If there is no new post posted, will get the entire posts
      this.postService.getAllPosts().subscribe(posts => {
        posts.forEach(post => {
          if (post.userId == this.userInput.id) {
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
            modifiedPost.user = this.userInput;
            modifiedPost.description = post.description;
            modifiedPost.image = post.image;
            modifiedPost.createdAt = post.createdAt;
            modifiedPost.likes = post.likes;
            modifiedPost.comments = post.comments;

            this.posts.push(modifiedPost);
            this.imagesFromPost.push(post.image[0]);
          }
        });

        this.posts = this.posts.sort((a, b) => a.createdAt - b.createdAt);
        if(!this.isImagesEmitted) {
          this.images.emit(this.imagesFromPost);
          this.isImagesEmitted = true;
        }
      });
    }
  }

  getAllPosts(isNewPost: boolean, specificPost?: Post): void {
    if (isNewPost && specificPost) {
      const newEditedPost = this.editPostBeforeCreate(specificPost);
      this.posts.unshift(newEditedPost);
    } else if (!isNewPost && specificPost) {
      return;
    } else {
      // If there is no new post posted, will get the entire posts
      this.postService.getAllPosts().subscribe(posts => {
        posts.forEach(post => {
          this.userSubscription = this.authService.getUserById(post.userId).subscribe(user => {
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
            if (user) {
              modifiedPost.id = post.id;
              modifiedPost.user = user;
              modifiedPost.description = post.description;
              modifiedPost.image = post.image;
              modifiedPost.createdAt = post.createdAt;
              modifiedPost.likes = post.likes;
              modifiedPost.comments = post.comments;

              this.posts.push(modifiedPost);
            }
          })
        });
        this.posts = this.posts.sort((a, b) => b.createdAt - a.createdAt);
      });
    }
  }


  likeAction(post: Post): void {
    if (this.user) {
      if (post.likes.includes(this.user.id)) {
        post.likes.splice(post.likes.indexOf(this.user.id), 1);
      } else {
        post.likes.push(this.user.id);
      }
      this.postService.likeAPost(post).subscribe(postLiked => this.getAllPosts(false, postLiked));
    }
  }

  deletePost(postId: string): void {
    this.postService.deletePostById(postId).subscribe();
  }

  editPostBeforeCreate(specificPost: Post): any {
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
      likes: [] as any[],
      comments: [] as any[],
    };
    if (this.userInput) {
      modifiedPost.id = specificPost.id;
      modifiedPost.user = this.userInput;
      modifiedPost.description = specificPost.description;
      modifiedPost.image = specificPost.image;
      modifiedPost.createdAt = specificPost.createdAt;
      modifiedPost.likes = specificPost.likes;
      modifiedPost.comments = specificPost.comments;
      this.userSubscription?.unsubscribe();
    } else {
      this.userSubscription = this.authService.getUserById(specificPost.userId).subscribe(user => {
        if (user) {
          modifiedPost.id = specificPost.id;
          modifiedPost.user = user;
          modifiedPost.description = specificPost.description;
          modifiedPost.image = specificPost.image;
          modifiedPost.createdAt = specificPost.createdAt;
          modifiedPost.likes = specificPost.likes;
          modifiedPost.comments = specificPost.comments;
          this.userSubscription?.unsubscribe();
        }
      });
    }

    return modifiedPost;
  }

  verifyIfIAmTheUser(userId: string): boolean {
    let myProfile = JSON.parse(localStorage.getItem('user') || '{}');
    return userId === myProfile.id;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
