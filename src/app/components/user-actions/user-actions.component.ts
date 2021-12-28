import { ImageDialogComponent } from './image-dialog/image-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-actions',
  templateUrl: './user-actions.component.html',
  styleUrls: ['./user-actions.component.scss']
})
export class UserActionsComponent implements OnInit {

  panelOpenState = false;

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState
  }

  postComment() {
 //   console.log(this.commentForm.get('text').value);
  }

  openImageDialog(): void {
    const dialogRef = this.dialog.open(ImageDialogComponent,
      {
        data: {
          title: "Upload images"
        },
        panelClass: "customDialog",
        width: '500px'
      }
      );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
