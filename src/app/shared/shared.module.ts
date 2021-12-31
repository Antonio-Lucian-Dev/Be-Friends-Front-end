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
import { LoadingComponent } from './loading/loading.component';
import { NotificationListComponent } from './nav-bar/notification-list/notification-list.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import { UserActionsComponent } from '../components/user-actions/user-actions.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatMenuModule} from '@angular/material/menu';


const NB_MODULES = [
  IvyCarouselModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatExpansionModule,
  ReactiveFormsModule,
  FormsModule,
  MatDividerModule,
  MatListModule,
  MatBadgeModule,
  MatDialogModule,
  MatProgressBarModule,
  MatCardModule,
  MatMenuModule
];
const COMPONENTS = [
  NavBarComponent,
  ListStoryComponent,
  ListPostComponent,
  LoadingComponent,
  UserActionsComponent
];

@NgModule({
  declarations: [...COMPONENTS, ListStoryComponent, LoadingComponent, NotificationListComponent, UserActionsComponent],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS, ...NB_MODULES]
})
export class SharedModule { }
