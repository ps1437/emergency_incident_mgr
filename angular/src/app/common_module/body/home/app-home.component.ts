import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
/* import { SosService } from '..../adminmodule/services/sos.service'; */
import { SosService } from '../../../adminmodule/services/sos.service';
import { MailServiceService } from '../../services/mail-service.service';
import { SOSModel } from '../../../models/sos.model';
import { DialogBoxComponent } from '../popupbox/dialog-box.component';

import { IncidentModel } from '../../../models/incident.model';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';

import { } from 'googlemaps';
import { ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { fadeInOut } from '../../animations/animatation';


@Component({
  selector: 'app-home',
  templateUrl: './app-home.component.html',
  styleUrls: ['./app-home.component.css'],
  animations: [fadeInOut]
})
export class AppHomeComponent implements OnInit {

  google: any;
  currentLocation: any;

  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;

  isTracking = false;
  locationId: any;
  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  count: number;
  sosList: SOSModel[];
  incident: IncidentModel;
  NONSOS: boolean = false;

  constructor(
    private router: Router,

    private dialog: MatDialog,

    private _sso_service: SosService,

    private _mailService: MailServiceService,

    private toster: ToastrService,
    private spinner: NgxSpinnerService
  ) { }





  ngOnInit() {
    //
    this.spinner.show();
    this._sso_service.getServcies().subscribe(res => {
      this.sosList = res;
      
      this.spinner.hide();
    });

    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.findMe();
    //

  }

  findMe() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.showPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  showPosition(position) {
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    this.map.panTo(location);
    //console.log('location ..' + location);

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: position.coords.latitude, lng: position.coords.longitude }
    });

    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
    this.geocodeLatLng(
      geocoder,
      infowindow,
      position.coords.latitude,
      position.coords.longitude
    );

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Located'
      });
    } else {
      this.marker.setPosition(location);
    }
  }

  geocodeLatLng(geocoder, infowindow, lat, long) {
    var latlng = { lat: parseFloat(lat), lng: parseFloat(long) };
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          localStorage.setItem('location', results[0].formatted_address);
          this.currentLocation = results[0].formatted_address;

          infowindow.setContent(results[0].formatted_address);
          // infowindow.open(map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  //

  showForm() {
    this.NONSOS = !this.NONSOS;
  }

  showOneClickService(value) {
    this.NONSOS = value;
  }

  raiseSOS(sosName: string, sos_emailId: string) {
    this.dialog
      .open(DialogBoxComponent, {
        data: {
          id: '',
          msg: 'Are you sure you want raise SOS ?',
          buttonY: true,
          buttonN: true,
          header: 'Incident'
        }
      })
      .afterClosed()
      .subscribe(res => {
        if (res == 'Y') {

          if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
              this.showPosition(position);
            });
          } else {
            alert('Geolocation is not supported by this browser.');
          }
          console.log(
            'sosName :' +
            sosName +
            ' sos_emailId: ' +
            sos_emailId +
            ' current location : ' +
            localStorage.getItem('location')
          );
          let mailBody =
            sosName +
            ' SOS has been raised. Please find the location detail :- ' +
            localStorage.getItem('location');
          //console.log('mail body : ' + mailBody);
          //
          //
          if (
            sos_emailId != null &&
            sos_emailId != undefined &&
            sos_emailId.length > 0
          ) {
            this._mailService.send(sosName, sos_emailId, mailBody).subscribe(
              res => {
                console.log(
                  'res in ang mail' + JSON.stringify(res) + ' ' + res
                );

                if (res.message) {
                  this.toster.success('Email Sent Successfully !!');
                }


                this.router.navigate(['dashboard/home']);
              },
              err => {
                console.log('Error occured****' + err);
              }
            );
          } else {
            console.log('Email id doesnot exist');
            this.toster.success('Failed To Sent Email!');
          }
          // this._http.post(this._mailUrl, 'abc');
        }
      });
  }
}
