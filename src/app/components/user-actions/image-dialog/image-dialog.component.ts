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
    if(this.fileDropEl) {
      this.fileDropEl.nativeElement.click();
    }
  }

  prepareFilesList(files: any): void {
    for(const item of files.files) {
      const actualImage = {
        id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
        value: item
      }
      this.images.push(actualImage);
    }
    console.log(files.files);

   /* this.filesToUpload = [];
    for(const item of files.files) {
      this.filesToUpload.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.filesToUpload.forEach(file => {
      let indexFileProgress = 0;
      if(this.filesUploaded.length > 0) {
        const fileInArray = this.filesUploaded.find(fileUp => fileUp.name === file.name);
        if(fileInArray) {
          const indexOfCurrentFile = this.filesUploaded.indexOf(fileInArray);
          this.filesUploaded.splice(indexOfCurrentFile, 1, file);
          indexFileProgress = this.filesUploaded.push(file) -1;
        } else {
          indexFileProgress = this.filesUploaded.push(file) -1;
        }
      } else {
        indexFileProgress = this.filesUploaded.push(file) -1;
      }
      this.postService.uploadFiles(file).subscribe(data => console.log(data));
    })
  } */
  }

  createPost() {
    let post = {
      id: Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1),
      userId: this.data.userId,
      description: '',
      image: this.images,
      createdAt: new Date(),
      likes: [],
      comments: []
    }
    if(this.userForm.valid) {
       post.description = this.userForm.get("descripion")?.value;
    }
    console.log(post);
  }
}
