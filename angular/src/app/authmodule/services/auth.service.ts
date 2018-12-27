import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { RegModel } from "../../models/userreg.model";
import { ResponseData } from "../../models/response.model";
import { environment } from "../../../environment";
import { Subject } from "rxjs";
import { Router } from "@angular/router";
import * as jwt_decode from "jwt-decode";
import { ToastrService } from "ngx-toastr";
@Injectable({providedIn: 'root'})
export class AuthService {
  private message: string;
  private tokenTimer: any;
  sosObservable: Observable<RegModel[]>;

  private URL = environment.url;

  private authStatusListener = new Subject<boolean>();
  private token: string;
  private isAuthenticated = false;

  constructor(
    private router: Router,
    private _httpClient: HttpClient,
    private toastr: ToastrService
  ) { }

  registerUser(user: RegModel): Observable<ResponseData> {
    return this._httpClient.post<ResponseData>(this.URL + "/signup", user);
  }

  getUserDetails(userId: string): Observable<RegModel> {
    return this._httpClient.get<RegModel>(this.URL + "/profile/" + userId);
  }

  socialLogin(socailUserData) {
    this._httpClient
      .post<ResponseData>(this.URL + "/social", socailUserData)
      .subscribe(
        res => {
          console.log(res);
          this.validateAuth(res);
        },
        err => {
          this.authStatusListener.next(false);
        }
      );
  }
  getToken() {
    const token =  localStorage.getItem("token");
    return token;//this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getTokenData() {
    return jwt_decode(localStorage.getItem("token"));
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  validateLogin(user: RegModel) {
    
 
    this._httpClient.post<ResponseData>(this.URL + "/login", user).subscribe(
      res => {
       
        this.validateAuth(res);
      },
      errr => {
        console.log("errr"+ JSON.stringify(errr));
        this.toastr.warning(errr.error.message);
        console.log(errr);
        this.authStatusListener.next(false);
      }
    );
  }

  validateAuth(res) {
    const authStatus = res.auth;

    if (!authStatus) {

      this.toastr.warning(res.message);
      this.authStatusListener.next(false);
      this.router.navigate([""]);
    } else {
      const token = res.token;
      const expiresInDuration = res.expiresIn;
      this.setAuthTimer(expiresInDuration);

      const jwtTokenDecode = jwt_decode(token);
      this.token = token;

      const userType = jwtTokenDecode.userType;
      const userName = jwtTokenDecode.userName;
      this.isAuthenticated = true;
      this.authStatusListener.next(true);
      const now = new Date();
      const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
      console.log(expirationDate);
      this.saveAuthData(token, expirationDate, userType, userName);
      this.toastr.info("Welcome " + userName);
      this.router.navigate(["dashboard/home"]);
    }
  
  }

  private saveAuthData(
    token: string,
    expirationDate: Date,
    userType: string,
    userName: string
  ) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
  }
  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  updateProfile(user: RegModel): Observable<{ status: boolean }> {
    return this._httpClient.put<{ status: boolean }>(
      this.URL + "/profile/update",
      user
    );
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }
  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("expiration");
  }
}
