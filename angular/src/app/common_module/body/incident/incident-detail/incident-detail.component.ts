import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { IncidentModel } from '../../../../models/incident.model';
import { IncidentServiceService } from '../../../services/incident-service.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material';
import { DialogBoxComponent } from '../../popupbox/dialog-box.component';
import { AuthService } from '../../../../authmodule/services/auth.service';
import {flyFromBottom} from '../../../animations/animatation';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'incident-detail',
  templateUrl: './incident-detail.component.html',
  styleUrls: ['./incident-detail.component.css'],
  animations:[flyFromBottom]
})
export class IncidentDetailComponent implements OnInit {

  in:string;
  selectedIncident: IncidentModel;
  updateIncident: IncidentModel;

  statusList: string[] = ['Open', 'Not Valid', 'Closed', 'Delegated'];
  incident_no;
  viewPage = false;

  superUser :boolean=false;
  showIncident: boolean = true;

  public constructor(
    private dialog: MatDialog,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private _incidentService: IncidentServiceService,
    private router: Router,
    private auth : AuthService,
    private spinner :NgxSpinnerService
  ) { }

  ngOnInit() {
    this.spinner.hide();

    this.route.params.forEach((params: Params) => {
      console.log(params);
      this.incident_no = +params['id'];
      this.viewPage = params['data'];
    });

   
 
    this._incidentService.getIncident(this.incident_no).subscribe(response => {
      this.selectedIncident = response;
      console.log(response);
      this.updateIncident.incident_no = this.incident_no;
      this.updateIncident = this.selectedIncident;
      this.spinner.show();
    });

    this.superUser =  this.auth.getTokenData().userType == 'S' ? true :false;
  }

  updateIncidentDetails(formValue: IncidentModel) {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: formValue.contact_no,
          msg: 'Are you sure you want update a incident ?',
          buttonY: true,
          buttonN: true,
          header: 'Incident'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == 'Y') {
          this._incidentService
            .updateIncident(formValue)
            .subscribe(response => {
              if (response.status) {
                this.toastr.success(
                  'Incident is updated sucessfully with incident no :' +
                  formValue.incident_no
                );
                this.router.navigate(['/dashboard/incident']);
              } else {
                this.toastr.warning('Something went wrong , please try again');
              }
            });
        }
      });
  }

  goBack() {
    this.router.navigate(['/dashboard/incident']);

  }
}
