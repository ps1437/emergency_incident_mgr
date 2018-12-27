import { Component, OnInit } from '@angular/core';
import { RegModel } from '../../models/userreg.model';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from '../../common_module/body/popupbox/dialog-box.component';
import {listAnimation} from '../../common_module/animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations:[listAnimation]

})
export class UserComponent implements OnInit {
  userList: RegModel[];

  //  private userType:string[]={'A','S','N'};
  userTypeList: any[] = [
    { key: 'A', value: 'Admin' },
    { key: 'N', value: 'Normal user' },
    { key: 'S', value: 'Super user' }
  ];
  constructor(
    private _userService: UserService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private spinner :NgxSpinnerService

  ) { }

  ngOnInit() {
    this.spinner.show();
    this._userService.getUsers().subscribe(res => {
      this.userList = res;
      this.spinner.hide();
      console.log(this.userList);
    });
  }

  updateUser(user: RegModel) {


    this.dialog.open(DialogBoxComponent, {
      data: {
        id: '',
        msg: 'Are you sure you want update the user type ?',
        buttonY: true,
        buttonN: true,
        header: 'User Update'

      }
    }).afterClosed().subscribe(res => {
      if (res == 'Y') {
        this._userService.updateUser(user).subscribe(res => {
          if (res.ok === 1) {
            this.toastr.success(user.firstName + ' details updated successfully.');
          } else {
            this.toastr.success('Failed to update ' + user.firstName + ' details');
          }
        });
      }

    }

    );
  }
}
