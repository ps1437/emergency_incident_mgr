import { Injectable } from "@angular/core";
import { SOSModel } from "../../models/sos.model";
import { Observable } from "rxjs/Observable";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environment";

@Injectable({ providedIn: 'root' })
export class SosService {
  private baseUrl = environment.url + "/admin/sos";

  sosObservable: Observable<SOSModel[]>;

  constructor(private _httpClient: HttpClient) {
  }


  addservice(addSOS: SOSModel): Observable<{ message: string }> {

    return this._httpClient.post<{ message: string }>(
      this.baseUrl + "/create",
      addSOS
    );
  }

  getServcies(): Observable<SOSModel[]> {
    return this._httpClient.get<SOSModel[]>(this.baseUrl);
  }

  deleteService(sos_id: string): Observable<SOSModel> {
    return this._httpClient.delete<SOSModel>(
      this.baseUrl + "/delete/" + sos_id
    );
  }
}
