import { User } from './../interface/User';
import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../interface/Post';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild("uploadImageInput", { static: false })
  fileDropEl!: ElementRef;

  private routeSub: Subscription | undefined;
  private userId: string = '';

  public user: User | undefined;

  images: any[] = [];
  posts: any[] | undefined;

  constructor(private router: Router, private postService: PostService, private route: ActivatedRoute, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; //log the value of id
      this.authService.getUserById(this.userId).subscribe(user => this.user = user);
      this.postService.getPostByUserId(this.userId).subscribe(posts => this.posts = posts);
    });
  }

  openUploadFileInput(): void {
    if (this.fileDropEl) {
      this.fileDropEl.nativeElement.click();
    }
  }

  uploadImage(images: any): void {
    for (const item of images.files) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        let profileImageToChange = document.getElementById('userImageProfile') as HTMLImageElement;
        if (reader.result) {
          profileImageToChange.style.backgroundImage = `url(${reader.result.toString()})`;
          this.user!.profileImage = reader.result?.toString() || "./assets/img/no-image.png";
          this.authService.editUser(this.user!).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.isUserModified.emit(true);
          })
        }
      });
      reader.readAsDataURL(item);
    }
  }

  home(): void {
    this.router.navigate(['/home']);
  }

  getAllImages(): void {
    console.log(this.userId)
    this.postService.getPostByUserId(this.userId).subscribe(userPosts => {
      userPosts.forEach(userPost => {
        userPost.image.forEach(image => this.images.push(image));
      });
    });
  }

  deletePost(postId: string): void {}

  likeAction(post: any): void {}

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

}
