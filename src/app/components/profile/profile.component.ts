import { UpdateUserDataModalComponent } from './update-user-data-modal/update-user-data-modal.component';
import { Image } from './../interface/Post';
import { User } from './../interface/User';
import { AuthService } from './../../auth/auth.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Post } from '../interface/Post';
import * as _ from 'lodash';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  @ViewChild("uploadImageInput", { static: false })
  fileDropEl!: ElementRef;

  private routeSub: Subscription | undefined;

  public userId: string = '';

  public myProfile: User | undefined;

  // Complete user
  public user: User | undefined;

  posts: Post[] = [];
  images: any[] = [];

  isMyProfile: boolean = false;

  isUserInMyFollowed = false;

  isLoading = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.myProfile = JSON.parse(localStorage.getItem('user') || '{}');
    this.routeSub = this.route.params.subscribe(params => {
      this.userId = params['id']; //log the value of id
      this.authService.getUserById(this.userId).subscribe(user => {
        this.user = user;
        setTimeout(() => {
          this.isLoading = false;
        }, 2000);
        if (this.user.id == this.myProfile!.id) {
          this.isMyProfile = true;
        }
        this.isActualUserInMyFollowed();
      });
    });
  }

  openUploadFileInput(): void {
    if (this.fileDropEl && this.isMyProfile) {
      this.fileDropEl.nativeElement.click();
    }
  }

  /*
  isActualUserInMyFollower(): void {
    let userFinded;
    userFinded = this.myProfile?.follower.find(userId => userId == this.userId);
    if(userFinded) {
      this.isUserInMyFollowed = true;
    } else {
      this.isUserInMyFollowed = false;
    }
  } */

  isActualUserInMyFollowed(): void {
    let userFinded;
    if(this.myProfile) {
      userFinded = this.myProfile.followed.find(userId => userId == this.userId);
    }
    console.log(this.myProfile)
console.log(userFinded)
    if(userFinded) {
      this.isUserInMyFollowed = true;
    } else {
      this.isUserInMyFollowed = false;
    }
    console.log(this.isUserInMyFollowed)
  }

  addBornLocation(): void {
    this.openDialog(true);
  }

  addLiveLocation(): void {
    this.openDialog(false);
  }

  openDialog(isBornLocation: boolean): void {
    const dialogRef = this.dialog.open(UpdateUserDataModalComponent, {
      width: '300px',
      height: '300px',
      data: {isBornLocation: isBornLocation},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(isBornLocation && result) {
        this.user!.bornLocation = result;
        this.authService.editUser(this.user!).subscribe();
      } else if(!isBornLocation && result) {
        this.user!.liveLocation = result;
        this.authService.editUser(this.user!).subscribe();
      }
    });
  }

  followActualUser(userId: string): void {
    if(this.myProfile && userId) {
      this.myProfile?.followed.push(userId);
      this.authService.editUser(this.myProfile).subscribe(() => {
        this.user?.follower.push(this.myProfile!.id);
        this.updateActualUser(this.user!);
      });
    }
  }

  unfollowActualUser(userId: string): void {
    if(this.myProfile && userId) {
      this.myProfile?.followed.splice(this.myProfile.followed.indexOf(userId), 1);
      this.authService.editUser(this.myProfile).subscribe(() => {
        console.log(this.myProfile);
        this.user?.follower.splice(this.user?.follower.indexOf(this.myProfile!.id), 1);
        this.updateActualUser(this.user!);
      });
    }
  }

  updateActualUser(user: User): void {
    this.authService.editUser(user).subscribe(() => {
      localStorage.setItem('user', JSON.stringify(this.myProfile));
      this.isActualUserInMyFollowed();
    });
  }


  uploadImage(images: any): void {
    for (const item of images.files) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        let profileImageToChange = document.getElementById('userImageProfile') as HTMLImageElement;
        if (reader.result) {
          profileImageToChange.style.backgroundImage = `url(${reader.result.toString()})`;
          this.user!.profileImage = reader.result?.toString() || "./assets/img/no-image.png";
          this.authService.editUser(this.user!).subscribe(user => {
            localStorage.setItem('user', JSON.stringify(user));
            this.authService.isUserModified.emit(true);
          })
        }
      });
      reader.readAsDataURL(item);
    }
  }

  home(): void {
    this.router.navigate(['/home']);
  }


  getImagesFromPosts(images: any): void {
    this.images = [];
    console.log("Images emitted: ", images);
    this.images = images;
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }

}
