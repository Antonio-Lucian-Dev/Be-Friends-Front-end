import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-user-data-modal',
  templateUrl: './update-user-data-modal.component.html',
  styleUrls: ['./update-user-data-modal.component.scss']
})
export class UpdateUserDataModalComponent implements OnInit {

  isBornLocation = false;

  constructor(
    public dialogRef: MatDialogRef<UpdateUserDataModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit(): void {
    this.isBornLocation = this.data.isBornLocation;
  }

}
