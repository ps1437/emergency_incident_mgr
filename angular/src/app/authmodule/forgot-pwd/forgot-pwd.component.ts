import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordService } from '../services/password.service';
import { RegModel } from '../models/userreg.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-pwd',
  templateUrl: './forgot-pwd.component.html',
  styleUrls: ['./forgot-pwd.component.css']
})
export class ForgotPwdComponent implements OnInit {
   pwd: string;
   cpwd: string;
   userId: string;
   token: any;
   msg: string = '';
   showResetPwdForm: boolean = false;
  constructor(
    private router: Router,
    private passwordService: PasswordService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  validateUserId(userId: string) {
    this.passwordService.validateUser(userId).subscribe(res => {
      console.log(res);
      if (res.auth) {
        this.showResetPwdForm = true;
        this.msg = res.message;
        this.toastr.info(this.msg);
        sessionStorage.setItem('pwdToken', res.token);
      } else {
        this.toastr.info('Email Id Doesnot Exist');
      }
    });
  }

  changePassword(token: any, userId: string, password: string) {
    const resetToken = sessionStorage.getItem('pwdToken');

    if (resetToken === token) {
      this.passwordService
        .changePassword(userId, password, resetToken)
        .subscribe(res => {
          console.log('changePWdd' + res);
          if (res.auth) {
            this.showResetPwdForm = false;
            this.msg = res.message;
            sessionStorage.removeItem('pwdToken');
          }
        });
    } else {
      alert('Invalid token');
    }
  }

  goBack() {
    this.router.navigate(['']);
  }
}
