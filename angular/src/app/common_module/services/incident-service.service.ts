import { Injectable } from '@angular/core';
import { IncidentModel } from '../../models/incident.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment } from '../../../environment';

 @Injectable({
  providedIn: 'root'
})
export class IncidentServiceService {

  private  _incidentsUrl = environment.url+'/incident';


  constructor(private _http: HttpClient) {
    }

  getIncidents():Observable<IncidentModel[]>  {
    return this._http.get<IncidentModel[]> (this._incidentsUrl);
  }
  addIncident(newIncident: IncidentModel):Observable<IncidentModel>  {

    return this._http.post<IncidentModel>(this._incidentsUrl + '/create', newIncident);
  }
  getIncident(incident_no: any):Observable<IncidentModel> {
    return this._http.get<IncidentModel>(this._incidentsUrl + '/' + incident_no);
  }
  updateIncident(updatedIncident: IncidentModel):Observable<{'status':boolean}>  {
    return this._http.put<{'status':boolean}>(this._incidentsUrl + '/update', updatedIncident);
  }
}
