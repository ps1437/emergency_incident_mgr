import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { IncidentModel } from '../../../models/incident.model';
import { IncidentServiceService } from '.././../services/incident-service.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogBoxComponent } from '../popupbox/dialog-box.component';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
// import { trigger, transition, useAnimation } from '@angular/animations';
// import { fadeInDown,bounceInRight} from 'ng-animate';
import { flyItems} from '../../animations/animatation';

import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'non-sos-form',
  templateUrl: './non-sos.component.html',
  styleUrls: ['./non-sos.component.css'],
  animations: [flyItems]
})
export class NonSOSComponent implements OnInit {
  @ViewChild('addIncident') myNgForm;
  message: string;
  responseIncident: IncidentModel;
  statusList: string[] = ['Open'];
  selected = 'Open';
  completeAddress: string;
  in:string;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private _incident_service: IncidentServiceService,
    private toastr: ToastrService
  ) { }

//  @Output() eventEmitter: new EventEmitter();

  ngOnInit() {

   }

   @Output() showNonSosForm = new EventEmitter();


   goBack() {
      this.showNonSosForm.emit(false);
   }
  handleAddressChange(data) {
    this.completeAddress = data.formatted_address;
  }

  addNewIncident(incident: IncidentModel, form: NgForm) {

    const token = jwt_decode(localStorage.getItem('token'));
   if( this.completeAddress){
      incident.incident_location =  this.completeAddress;
   }
    incident.incident_raised_by = token.user_id;
   

    this.dialog.open(DialogBoxComponent, {
      data: {
        id: '',
        msg: 'Are you sure you want raise a incident ?',
        buttonY: true,
        buttonN: true,
        header: 'Incident'

      }
    }).afterClosed().subscribe(res => {
      if (res == 'Y') {



        this._incident_service.addIncident(incident).subscribe(
          res => {
            if (res.incident_no) {
              this.toastr.success('Incident is raised sucessfully with incident no :' + res.incident_no);
            }else{
              this.toastr.warning('Something went wrong , please try again');
            }
            form.reset();
            this.myNgForm.resetForm();
            this.router.navigate(['dashboard/home']);
          },
          err => {
            this.toastr.warning('Something went wrong , please try again');

            console.log('Error occured');
          }
        );

      }

    });


  }


}
