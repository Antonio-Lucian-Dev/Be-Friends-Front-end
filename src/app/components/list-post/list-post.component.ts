import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { User } from './../interface/User';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Post, Image } from '../interface/Post';
import { Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit, OnDestroy {

  private userSubscription: Subscription | undefined

  posts: any[] = [];

  user: User | undefined;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllPosts(false);

    // Retrieve my user
    this.authService.getUser().subscribe(user => this.user = user);

    // When a post is created this event will be subscribed
    this.postService.isPostCreated.subscribe(post => this.getAllPosts(true, post));

    // When a post receive a like this event will be subscribed
    this.postService.postLiked.subscribe(dataPost => {
      console.log("Post liked: ", dataPost);

      // is not a new post, but a post to be splice the old in the array
      this.getAllPosts(false, dataPost);
    });
  }

  getAllPosts(isNewPost: boolean, specificPost?: Post): void {
    if (isNewPost && specificPost) {
      const newEditedPost = this.editPostBeforeCreate(specificPost);
      this.posts.unshift(newEditedPost);
    } else if (!isNewPost && specificPost) {
      console.log(specificPost);
    } else {
      console.log("Intra aici")
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
         let newArr = _.sortBy(this.posts, [function(o) {
            console.log(o)
            return o.createdAt; }]);
            console.log(newArr)
        });

        console.log("Prima del sort: ", this.posts)
       // this.posts.sort((a: Post, b: Post) => a.createdAt.getDate() - b.createdAt.getDate());
        _.sortBy(this.posts, [function(o) {
          console.log(o)
          return o.createdAt; }]);
        console.log("Dopo il sort: ", this.posts)
      });
    }
  }


  /*
    if (specificPost && !isNewPost) {
      let actualEditedPost = this.editPostBeforeCreate(specificPost);
      this.posts.forEach(post => {
        if (post.id == actualEditedPost.id) {
          console.log("ActualEdited Post: ", actualEditedPost)
          this.posts.splice(this.posts.indexOf(post), 1, actualEditedPost);
        }
      });
    } else if(specificPost && isNewPost) {
      let actualEditedPost = this.editPostBeforeCreate(specificPost);
      console.log("ActualEdited Post: ", actualEditedPost)
      this.posts.unshift(actualEditedPost);
    } else {
      this.posts = [];
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

              this.posts.unshift(modifiedPost);
            }
            this.userSubscription?.unsubscribe();
          });
        });
        this.posts.sort((a: any, b: any) => a.createdAt - b.createdAt);
      });
    }
  */

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
    console.log(postId)
    this.postService.deletePostById(postId).subscribe(response => console.log(response));
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
    return modifiedPost;
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }

}
