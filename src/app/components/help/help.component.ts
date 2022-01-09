import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss']
})
export class HelpComponent implements OnInit {

  userInfo = this.fb.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
    description: ["", Validators.required],
  });

  initialValues: any;

  constructor(private router: Router, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initialValues = this.userInfo.value;
  }

   // convenience getter for easy access to form fields
   get userInfoControls() { return this.userInfo.controls; }

  goHome(): void {
   this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.userInfo.valid) {
      console.log(this.userInfo.value);
      // Send to back-end, will be available in the next version of this app
      this.toastr.success('An operator will answer you soon!', 'Your Message are sent');
      this.userInfo.reset(this.initialValues);
    }
  }

}
