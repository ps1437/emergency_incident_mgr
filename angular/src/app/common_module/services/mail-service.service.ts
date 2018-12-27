import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";

@Injectable({
  providedIn: "root"
})
export class MailServiceService {
  constructor(private _http: HttpClient) {}
  private _mailUrl = environment.url + "/mail";

  send(sosName, sos_emailId, mailBody) {
    return this._http.post<{ message: string }>(this._mailUrl + "/send", {
      sosName: sosName,
      sos_emailId: sos_emailId,
      mailBody: mailBody
    });
    //this._http.post(this._mailUrl, "abc");
  }
}
