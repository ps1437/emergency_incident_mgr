import { Component, OnInit, ViewChild } from '@angular/core';
import { } from 'googlemaps';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent {
  google: any;
  currentLocation: any;
  @ViewChild('gmap') gmapElement: any;
  map: google.maps.Map;
  mapData:any;
  isTracking = false;
  locationId: any;
  currentLat: any;
  currentLong: any;

  marker: google.maps.Marker;

  constructor(private ref: ChangeDetectorRef) { }
  ngOnInit() {
    var mapProp = {
      center: new google.maps.LatLng(18.5793, 73.8143),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    this.findMe();
    


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
    console.log('location' + location);

    this.mapData = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: position.coords.latitude, lng: position.coords.longitude }
    });

    var geocoder = new google.maps.Geocoder();
    var infowindow = new google.maps.InfoWindow();
     this.geocodeLatLng(
      geocoder,
      infowindow,
      position.coords.latitude,
      position.coords.longitude,
      this.mapData
    );
    this.ref.detectChanges();

    
      if (!this.marker) {
        this.marker = new google.maps.Marker({
          position: location,
          map: this.mapData,
        
          title: this.currentLocation
        });
      } else {
        this.marker.setPosition(location);
      }
   
      this.marker.setMap(this.map);
  }

  geocodeLatLng(geocoder, infowindow, lat, long,mapDataa): boolean {
    var latlng = { lat: parseFloat(lat), lng: parseFloat(long) };
    geocoder.geocode({ location: latlng }, function (results, status) {
      if (status === 'OK') {
        if (results[0]) {
          mapDataa.setZoom(11);
          var marker = new google.maps.Marker({
            position: latlng,
            map: this.map
          });
          console.log('---------' + results[0].formatted_address);
          this.currentLocation = results[0].formatted_address;
          infowindow.setContent(this.currentLocation);
          console.log('-------' + this.currentLocation);
          this.ref.detectChanges();
          infowindow.open(this.map, marker);
          
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
    return true;
  }

  trackMe() {
    if (navigator.geolocation) {
      this.isTracking = true;

      this.locationId = navigator.geolocation.watchPosition(position => {
        this.showTrackingPosition(position);
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }

  stopTrackingPostion() {
    this.isTracking = false;
    navigator.geolocation.clearWatch(this.locationId);
  }

  showTrackingPosition(position) {
    console.log(
      `tracking postion:  ${position.coords.latitude} - ${
      position.coords.longitude
      }`
    );
    this.currentLat = position.coords.latitude;
    this.currentLong = position.coords.longitude;

    let location = new google.maps.LatLng(
      position.coords.latitude,
      position.coords.longitude
    );
    this.map.panTo(location);

    if (!this.marker) {
      this.marker = new google.maps.Marker({
        position: location,
        map: this.map,
        title: 'Got you!'
      });
    } else {
      this.marker.setPosition(location);
    }
  }
}
