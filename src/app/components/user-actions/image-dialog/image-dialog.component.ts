import { PostService } from './../../../services/post.service';
import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'lodash';
import { Image } from '../../interface/Post';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-image-dialog',
  templateUrl: './image-dialog.component.html',
  styleUrls: ['./image-dialog.component.scss']
})
export class ImageDialogComponent implements OnInit {
  @ViewChild("fileDropRef", { static: false })
  fileDropEl!: ElementRef;
  filesToUpload: any[] = [];
  filesUploaded: any[] = [];
  @Output() isFileUploaded = new EventEmitter<boolean>();
  images: Image[] = [];

  userForm = new FormGroup({
    description: new FormControl('')
  });

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ImageDialogComponent>, private postService: PostService) { }

  ngOnInit(): void {
  }

  openUploadFileInput(): void {
    if (this.fileDropEl) {
      this.fileDropEl.nativeElement.click();
    }
  }

  prepareFilesList(files: any): void {
    for (const item of files.files) {

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const actualImage = {
          id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
          value: reader.result
        }
        this.images.push(actualImage);
      });
      reader.readAsDataURL(item);
    }
  }

  createPost() {
    let post = {
      id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
      userId: this.data.userId,
      description: this.userForm.get("description")?.value,
      image: this.images,
      createdAt: new Date(),
      likes: [] as any,
      comments: [] as any
    }
    this.postService.createPost(post).subscribe(result => {
      if(result) {
        this.dialogRef.close(result);
      }
    });

  }
}
