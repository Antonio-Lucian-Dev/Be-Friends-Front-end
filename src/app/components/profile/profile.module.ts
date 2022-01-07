import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import {MatTabsModule} from '@angular/material/tabs';
import { UpdateUserDataModalComponent } from './update-user-data-modal/update-user-data-modal.component';


@NgModule({
  declarations: [
    ProfileComponent,
    UpdateUserDataModalComponent
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    MatTabsModule,
    SharedModule,
    NgxSkeletonLoaderModule
  ]
})
export class ProfileModule { }
