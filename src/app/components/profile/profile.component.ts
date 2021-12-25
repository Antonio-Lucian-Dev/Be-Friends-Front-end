import { PostService } from './../../services/post.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  private routeSub: Subscription | undefined;
  private userId: string = '';

  public items: any[] = [
    {
        text: 'Edit',
        iconCss: 'ddb-icons e-edit'
    },
    {
        text: 'Delete',
        iconCss: 'ddb-icons e-delete'
    },
    {
        text: 'Mark As Read',
        iconCss: 'ddb-icons e-read'
    },
    {
        text: 'Like Message',
        iconCss: 'ddb-icons e-like'
    }];

    images: any[] = [];

  constructor(private router: Router, private postService: PostService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      console.log(params) //log the entire params object
      this.userId = params['id']; //log the value of id
    });
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  getAllImages(): void {
    console.log(this.userId)
   this.postService.getPostByUserId(this.userId).subscribe(userPosts => {
     userPosts.forEach(userPost => {
      userPost.post.image.forEach(image => this.images.push(image));
     });
   });
  }

}
