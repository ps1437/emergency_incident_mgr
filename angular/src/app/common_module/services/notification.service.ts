import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environment';
import { NotifyModel } from '../../models/notify.model';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private _http: HttpClient) {}
  private notification = environment.url + '/notification';

  getNotifications(): Observable<NotifyModel[]> {
    return this._http.get<NotifyModel[]>(this.notification + '/view');
  }

  createNotification(body: NotifyModel) {
    return this._http.post<{message:string,status:boolean}>(
      this.notification + '/create',
      body
    );
  }
}
