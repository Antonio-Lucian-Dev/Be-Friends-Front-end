import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit(): void {
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState
  }

  postComment() {
 //   console.log(this.commentForm.get('text').value);
  }

}
