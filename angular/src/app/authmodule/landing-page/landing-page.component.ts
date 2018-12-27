import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService as AuthLoginService } from '../services/auth.service';
import { RegModel } from '../../models/userreg.model';
import { ResponseData } from '../../models/response.model';


import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';
import { Subscription } from 'rxjs';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit, OnDestroy {
  result: ResponseData;
  user: RegModel;
  radius: number = 25;
  signUp: boolean = false;
  adddess: string;
  color: string = 'red';
  white: string = 'white';
  none: number = 0;
  cfpassword: string;
  isLoading = false;
  pageTitle: string = 'Login';
  message: string;
  private authStatus: Subscription;
  completeAddress: string;

  login = [{ user_id: '', password: '' }];

  private emailPattern = '/S+@S+.S+/';

  constructor(
    private socialAuthService: AuthService,
    private router: Router,
   
    private _authService: AuthLoginService //    private spinner: NgxSpinnerService
  ) { }

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

  onLogin(data) {
 
    this.isLoading = true;
    this._authService.validateLogin(data);
  

  }
  loginPage() {
    this.signUp = false;
  }
  signUpPage() {
    this.signUp = true;
  }

  tabChanged(event) {
    console.log('Clicked: ' + event.tab.textLabel);
  }

  // register(user: RegModel, form: NgForm) {
  //   user.activeStatus = 'Y';
  //   user.createdDate = new Date();
  //   this.isLoading = true;
  //   this._authService.registerUser(user).subscribe(res => {
  //     this.result = res;
  //     if (res.auth) {

  //       this.isLoading =false;
  //       this.message = 'You are sucessfully registered ';
  //       form.reset();
  //       this.router.navigate(['']);
  //     }
  //   },error =>{
  //     this.isLoading =false;
  //     this.message = error.error.message;

  //     console.log(error);
  //   });
  // }

  public socialSignIn(socialPlatform: string) {
    this.isLoading = true;
    let socialPlatformProvider;
    if (socialPlatform == 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {

      console.log("social :" + userData);
      if (userData) {
        this._authService.socialLogin(userData);
        this.router.navigate(['dashboard/home']);
      }
    });

  }
}
