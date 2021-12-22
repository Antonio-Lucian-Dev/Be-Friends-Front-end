import { ListPostComponent } from './../components/list-post/list-post.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ListStoryComponent } from './list-story/list-story.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const NB_MODULES = [
  IvyCarouselModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  ReactiveFormsModule,
  FormsModule
];
const COMPONENTS = [
  NavBarComponent,
  ListStoryComponent,
  ListPostComponent
];

@NgModule({
  declarations: [...COMPONENTS, ListStoryComponent],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS, ...NB_MODULES]
})
export class SharedModule { }
