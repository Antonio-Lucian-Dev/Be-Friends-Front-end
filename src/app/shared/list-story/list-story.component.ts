import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-story',
  templateUrl: './list-story.component.html',
  styleUrls: ['./list-story.component.scss']
})
export class ListStoryComponent implements OnInit {

  stories = [
    {
      userImage: "./assets/img/men-1.jpg"
    },
    {
      userImage: "./assets/img/girl-1.jpg"
    },
    {
      userImage: "./assets/img/girl-2.jpg"
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
