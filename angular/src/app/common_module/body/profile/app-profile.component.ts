import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../authmodule/services/auth.service';
import { RegModel } from '../../../authmodule/models/userreg.model';
import { ToastrService } from 'ngx-toastr';
import { DialogBoxComponent } from '../popupbox/dialog-box.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-profile',
  templateUrl: './app-profile.component.html',
  styleUrls: ['./app-profile.component.css']
})
export class AppProfileComponent implements OnInit {
  userData: RegModel;

  postalCode: string;
  country: string;
  profile: RegModel;
  constructor(
    private _authSerivce: AuthService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}
  private userId;

  ngOnInit() {
    this.userId = this._authSerivce.getTokenData().user_id;
    this._authSerivce.getUserDetails(this.userId).subscribe(response => {
      this.userData = response;
      this.profile = this.userData;
      const locations = this.userData.location.split(',');
      this.country = locations[locations.length - 1];
    });
  }

  updateProfile(userProfilePojo: RegModel) {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: '',
          msg: 'Are you sure you want update your profile ?',
          buttonY: true,
          buttonN: true,
          header: 'Profile'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == 'Y') {
          this._authSerivce
            .updateProfile(userProfilePojo)
            .subscribe(response => {
              if (response.status) {
                this.toastr.success('Profile updated sucessfully.');
              } else {
                this.toastr.error('Failed to update profile.');
              }
            });
        }
      });
  }
}
