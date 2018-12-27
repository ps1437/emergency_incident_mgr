import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { IncidentModel } from '../../../models/incident.model';
import { IncidentServiceService } from '../../services/incident-service.service';
import { AuthService } from '../../../authmodule/services/auth.service';
import { ExcelService } from '../../services/excel.service';
import { flyItems } from '../../animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-incident',
  templateUrl: './app-incident.component.html',
  styleUrls: ['./app-incident.component.css'],
  animations: [flyItems]
})
export class AppIncidentComponent implements OnInit {


  count: number;
  superUser: boolean = false;

  selectedIncident: IncidentModel;
  incidents: any;

  displayedColumns: string[] = [
    'incident_no',
    'incident_type',
    'incident_status',
    'incident_location',
    'contact_no',
    'incident_raised_by',
    'edit'

  ];

  dataSource = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private _incidentService: IncidentServiceService,
    private authService: AuthService,
    private excelService: ExcelService,
    private spinner: NgxSpinnerService
  ) {
    this.spinner.show();
    this.dataSource = new MatTableDataSource([]);

    this._incidentService.getIncidents().subscribe(response => {
      this.incidents = response;
      this.count = this.incidents.length;
      this.dataSource = new MatTableDataSource<IncidentModel>(this.incidents);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.applyFilter('');
      this.loadUserType();
      this.spinner.hide();
    });

  }

  ngOnInit() {
    this.loadUserType();
  }

  loadUserType() {
    const userType = this.authService.getTokenData();
    console.log(userType);
    if (userType.userType === 'S') {
      this.superUser = true;
    }

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.incidents, 'Incidents_');
  }



}

