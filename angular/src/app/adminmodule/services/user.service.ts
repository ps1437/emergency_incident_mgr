import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import {RegModel} from '../../models/userreg.model'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService{


  private  userUrl = environment.url+'/admin';


  constructor(private _http: HttpClient) {
    }

  getUsers():Observable<RegModel[]>  {
    return this._http.get<RegModel[]> (this.userUrl+'/users');
  }

  updateUser(user: RegModel):Observable<{'ok':number}>  {
    return this._http.post<{'ok':number}>(this.userUrl + '/user/update', user);
  }

}
