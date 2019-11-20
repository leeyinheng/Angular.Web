import { Component, OnInit, ViewChild } from '@angular/core';
import {BusinessCenter, BusinessCenterImage} from '../model/BusinessCenter';
import {BcserviceService} from '../service/bcservice.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {BcformmodalComponent} from '../bcformmodal/bcformmodal.component';
import { BusinesshourmodalComponent} from '../businesshourmodal/businesshourmodal.component';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';

@Component({
  selector: 'app-bcshow',
  templateUrl: './bcshow.component.html',
  styleUrls: ['./bcshow.component.css']
})
export class BcshowComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  bsModalRef: BsModalRef;

  _entity: BusinessCenter = new BusinessCenter();

    get Entity(): BusinessCenter {

        return this._entity;

    }

    set Entity( value: BusinessCenter) {


        this._entity = value;

    }

    
  zoom = 14;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: false,
    maxZoom: 15,
    minZoom: 8,
  };

  markers = [];

  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private modalService: BsModalService) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
      /** spinner starts on init */
      this.spinner.show();

      const ID: string = this.route.snapshot.paramMap.get('id');
  
  
      if (isNullOrUndefined(ID)) {
        alert('Wrong BC ID');
        this.spinner.hide();
      } else {
        this.bcservice.getEntityById(ID).subscribe(val => {
          this.Entity = val;
          this.spinner.hide();
          if (isNullOrUndefined(this.Entity.Coordinates) !== true) {
               this.addMarker();
          }
        },
        err => {
          alert('Not Found');
          this.spinner.hide();
        }
        );
      }
  
      if (isNullOrUndefined(this.Entity.Coordinates) !== true) {
        this.addMarker();
      } else {
        navigator.geolocation.getCurrentPosition(position => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
        });
      }

      
    
  }

  addMarker() {

    this.markers = [];
  
    const coord = this.Entity.Coordinates.split(',');
    this.markers.push({
      position: {
        lat: Number(coord[0]),
        lng: Number(coord[1]),
      },
      label: {
        color: 'red',
        text: this.Entity.Name + (this.markers.length + 1),
      },
      title: this.Entity.Name + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      url: 'https://www.google.com/maps/place/' + this.Entity.Coordinates ,
      options: {
        animation: google.maps.Animation.DROP
      }
    });
  
    this.center = {
      lat: Number(coord[0]),
      lng: Number(coord[1]),
    };
  
  }
  
  public opengooglemap() {
    const url = 'https://www.google.com/maps/place/' + this.Entity.Coordinates;
  
    window.open(
       url
    );
  
  }

}
