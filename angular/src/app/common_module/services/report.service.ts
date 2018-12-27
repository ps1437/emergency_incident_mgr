import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { HttpClient ,HttpHeaders} from "@angular/common/http";
import { Report } from "../../models/report.model";
import {environment} from '../../../environment';
@Injectable({
  providedIn: 'root'
})
export class ReportService {

  constructor(private _httpClient: HttpClient) { }


  private URL = environment.url;
  prepareReportData():Observable<Report[]>{
	  return this._httpClient.get<Report[]>(this.URL+"/report");

   }

   generateReport(month,year){
      const body = {
        'month':month,
        'year':year
     }
    return this._httpClient.post<Report[]>(this.URL+"/report/gen",body);
   }


}
