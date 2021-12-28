import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { User } from './../interface/User';
import { Component, OnInit } from '@angular/core';
import { Post, Image } from '../interface/Post';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent implements OnInit {

  private userSubscription: Subscription | undefined

  posts: any[] = [];

  user: User | undefined;

  constructor(private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(user => this.user = user);
    this.getAllPosts();
  }

  getAllPosts(): void {
    this.postService.getAllPosts().subscribe(posts => {
      posts.forEach(post => {
        /*  this.userSubscription = this.authService.getAllUsers().subscribe(users => {
            const currentUser = users.find(user => user.id == post.userId);
            console.log( currentUser)
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
              image: [] as  any,
              createdAt: '',
              likes: '',
              comments: [] as  any,
            };
            if(currentUser) {
              modifiedPost.id = post.id;
              modifiedPost.user = currentUser;
              modifiedPost.description = post.description;
              modifiedPost.image = post.image;
              modifiedPost.createdAt = post.createdAt;
              modifiedPost.likes = post.likes;
              modifiedPost.comments = post.comments;
              this.posts.push(modifiedPost);
            }
          }); */
        // this.userSubscription?.unsubscribe();
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
            image: [] as any,
            createdAt: '',
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
          }
          this.posts.push(modifiedPost);
        });
        //  this.userSubscription?.unsubscribe();
      });
    });
  }

  likeAction(post: Post): void {
    if (this.user) {
      if (post.likes.includes(this.user.id)) {
        post.likes.splice(post.likes.indexOf(this.user.id), 1);
      } else {
        post.likes.push(this.user.id);
      }
      this.postService.likeAPost(post).subscribe(() => this.getAllPosts());
    }
  }

}
