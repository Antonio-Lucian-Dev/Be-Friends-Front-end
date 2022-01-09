import { AuthService } from './../../auth/auth.service';
import { PostService } from './../../services/post.service';
import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import { User } from '../interface/User';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  @Input() userId: string = "";
  public user:User | undefined;

  panelOpenState = false;

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  constructor(public dialog: MatDialog, private postService: PostService, private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUserFromLocal().subscribe(user => this.user = user);
    this.authService.isUserModified.subscribe(() => {
      this.authService.getUserFromLocal().subscribe((user: User) => this.user = user);
    });
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState
  }

  postComment() {
    if(this.commentForm.valid) {
      console.log(this.commentForm.get('text')!.value);
      let post = {
        id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        userId: this.userId,
        description: this.commentForm.get('text')!.value,
        image: [],
        createdAt: new Date(),
        likes: [] as any,
        comments: [] as any
      }
      this.postService.createPost(post).subscribe(result => {
        if(result) {
          this.postService.isPostCreated.emit(result);
          this.panelOpenState = false;
          this.commentForm.get('text')?.patchValue("");
        }
      });

    }
  }

  openImageDialog(): void {
    const dialogRef = this.dialog.open(ImageDialogComponent,
      {
        data: {
          title: "Upload images",
          userId: this.userId
        },
        panelClass: "customDialog",
        width: '500px'
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        // Emit the post created
        this.postService.isPostCreated.emit(result);
      }
    });
  }

}
