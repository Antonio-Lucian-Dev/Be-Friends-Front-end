import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { User } from './../interface/User';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Post, Image } from '../interface/Post';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy {

  @Input() myProfile: User | undefined;
  @Input() specificUser: User | undefined;

  @Input() myUserId: string = "";

  // We can emit to profile component our images to be displayed on photo section
  @Output() imageListEmitter = new EventEmitter<Image[]>();

  // Modified posts with user added on it
  posts: any[] = [];
  images: Image[] = [];

  // A list of all users
  allUsers: User[] = [];


  private userSubscription: Subscription | undefined;
  private postSubscription: Subscription | undefined;
  private routeSub: Subscription | undefined;

  constructor(private postService: PostService, private authService: AuthService, private router: Router, private route: ActivatedRoute,) { }

  ngOnInit(): void {
    // Daca este profilul meu dami doar postarile mele
    this.routeSub = this.route.params.subscribe(params => {
      if(params['id']) {
        this.authService.getUserById(params['id']).subscribe(user => {
          if(user && this.specificUser) {
            if (user.id !== this.specificUser!.id) {
              this.myProfile = user;
              this.specificUser = undefined;
            }
          }
          this.verifyWhatUserToLoadPosts();
        });
      }
      this.verifyWhatUserToLoadPosts();
    });


    // Emitte-uri pentru a face un fel de refresh in postarile noastre

    // When a post is created this event will be subscribed
    this.postSubscription = this.postService.isPostCreated.subscribe(post => {
      if(this.allUsers.length > 0) {
        console.log(this.allUsers)
        const actualUser = this.allUsers.find(user => user.id == post.userId);
        if (actualUser) {
          this.modifyPost(post, actualUser);
        }
      } else {
        console.log("else")
        this.authService.getAllUsers().subscribe(users => {
          this.allUsers = users;
          const actualUser = this.allUsers.find(user => user.id == post.userId);
          if (actualUser) {
            console.log("Intra s")
            this.modifyPost(post, actualUser);
          }
        });
      }
      this.postSubscription?.unsubscribe();
    });

    // When a post receive a like this event will be subscribed
    this.postSubscription = this.postService.postLiked.subscribe(postLiked => {
      this.posts.splice(this.posts.indexOf(postLiked.id), 1, postLiked);
      this.postSubscription?.unsubscribe();
    });
  }

  verifyWhatUserToLoadPosts(): void {
    if (this.myProfile) {
      this.getPostForSpecificUser(this.myProfile);
    } else if (this.specificUser) {
      this.getPostForSpecificUser(this.specificUser);
    } else {
      // Daca nu dami toate postarile
      this.userSubscription = this.authService.getAllUsers().subscribe(users => {
        this.allUsers = users;
        this.getUsersPost(users);
        this.userSubscription?.unsubscribe();
      });
    }
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

  getPostForSpecificUser(user: User): void {
    console.log("User ", user)
    this.postSubscription = this.postService.getPostByUserId(user.id).subscribe(posts => {
      this.posts = [];
      console.log(posts)
      if(posts) {
        posts.forEach(post => {
          this.modifyPost(post, user);
        });
      }
    });
  }

  goToUserProfile(userId: string): void {
    this.router.navigate([`/profile/${userId}`]);
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
    if (this.myProfile || this.specificUser) {
      const usersPost = this.posts.filter(post => {
        if ((this.myProfile && post.user.id == this.myProfile.id) || (this.specificUser && post.user.id == this.specificUser.id)) {
          return post;
        }
      });
      const images: Image[] = [];
      usersPost.forEach(post => {
        images.push(...post.image);
      });
      this.imageListEmitter.emit(images);
    }
  }

  // Pentru imagini fac un find pe posts care se regaseste cu userul actual



  likeAction(post: Post): void {
    if (this.myUserId) {
      if (post.likes.includes(this.myUserId)) {
        post.likes.splice(post.likes.indexOf(this.myUserId), 1);
      } else {
        post.likes.push(this.myUserId);
      }
      this.postSubscription = this.postService.likeAPost(post).subscribe(() => {
        this.postSubscription?.unsubscribe();
        this.userSubscription?.unsubscribe();
      });
    }
  }

  deletePost(post: any): void {
    this.postService.deletePostById(post.id).subscribe(() => {
      this.postService.isPostDeleted.emit(false);
      this.posts.splice(this.posts.indexOf(post), 1);
    });
  }

  /*
  verifyIfIAmTheUser(userId: string): boolean {
    let myProfile = JSON.parse(localStorage.getItem('user') || '{}');
    return userId === myProfile.id;
  } */

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
    this.postSubscription?.unsubscribe();
    this.routeSub?.unsubscribe();
  }

}
