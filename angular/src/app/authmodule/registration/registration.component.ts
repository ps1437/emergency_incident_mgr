import { Component, OnInit, OnDestroy } from '@angular/core';
import { RegModel } from '../../models/userreg.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ResponseData } from '../../models/response.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  result: ResponseData;
  user: RegModel;
  phoneNoPattern = '^[0-9]{10}$';
  radius: number = 25;
  adddess: string;
  color: string = 'red';
  white: string = 'white';
  none: number = 0;
  cfpassword: string;
  isLoading = false;
  private message: string;
  private authStatus: Subscription;
  completeAddress: string;
  login = [{ user_id: '', password: '' }];

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private _authService: AuthService 
  ) {}

  ngOnInit() {
    this.authStatus = this._authService
      .getAuthStatusListener()
      .subscribe(authStatus => {
        this.isLoading = false;
      });
  }

  ngOnDestroy() {
    this.authStatus.unsubscribe();
  }

  handleAddressChange(data) {
    this.completeAddress = data.formatted_address;
  }

  register(user: RegModel, form: NgForm) {
    console.log(user);
    user.activeStatus = 'Y';
    user.createdDate = new Date();
    this.isLoading = true;
    if( this.completeAddress){
        user.location = this.completeAddress;
    }

    this._authService.registerUser(user).subscribe(
      res => {
        this.result = res;
        if (res.auth) {
          this.isLoading = false;
          this.toastr.success(res.message);

          form.reset();
          this.router.navigate(['']);
        }else{
          this.isLoading = false;
          this.toastr.success(res.message);

        }
      },
      error => {
        this.isLoading = false;
        this.message = error.error.message;
        this.toastr.success( this.message);
        console.log(error);
      }
    );
  }
}
