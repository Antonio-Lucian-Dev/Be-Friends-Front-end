import { AuthService } from './../../auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  panelOpenState = false;

  commentForm = new FormGroup({
    text: new FormControl('', Validators.required)
  });

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  togglePanel(): void {
    this.panelOpenState = !this.panelOpenState
  }

  postComment() {
 //   console.log(this.commentForm.get('text').value);
  }

}
