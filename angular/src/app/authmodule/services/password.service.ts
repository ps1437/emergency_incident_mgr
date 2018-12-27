import { Injectable } from "@angular/core";
import { environment } from "../../../environment";
import { Observable } from "rxjs";
import { ResponseData } from "../../models/response.model";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class PasswordService {

  private URl = environment.url;
  constructor(private _httpClient : HttpClient) {

  }
  validateUser(userId:string):Observable<ResponseData>{
     const userEmail = {'userId' : userId};
      return  this._httpClient.post<ResponseData>(this.URl +"/pwd/reset",userEmail);

  }

  changePassword(emailId:string,updatePwd:string,resetToken:any){

    const userObject = {
      userPwd : updatePwd,
       resetToken : resetToken,
       user_id :emailId
    }
    return  this._httpClient.post<{auth:boolean,message:string}>(this.URl +"/pwd/updatePassword",userObject);


  }

}
