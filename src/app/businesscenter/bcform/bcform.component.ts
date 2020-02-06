import { Component, OnInit, ViewChild } from '@angular/core';
import { BusinessCenterImage} from '../model/BusinessCenter';
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
import { Vendor } from '../model/Inhub';

@Component({
  selector: 'app-bcform',
  templateUrl: './bcform.component.html',
  styleUrls: ['./bcform.component.css']
})
export class BcformComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) info: MapInfoWindow;

  bsModalRef: BsModalRef;

  isAdd = false;

  _entity: Vendor = new Vendor();

    get Entity(): Vendor {

        return this._entity;

    }

    set Entity( value: Vendor) {


        this._entity = value;

    }

  public files: NgxFileDropEntry[] = [];


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
  // tslint:disable-next-line:max-line-length
  constructor(private bcservice: BcserviceService, private spinner: NgxSpinnerService, private route: ActivatedRoute, private modalService: BsModalService) {
    console.log(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {

     /** spinner starts on init */
    this.spinner.show();

    const ID: string = this.route.snapshot.paramMap.get('id');


    if (isNullOrUndefined(ID)) {
      this.isAdd = true;
      this.AddNew();
      this.spinner.hide();
    } else {
      this.bcservice.getEntityById(ID).subscribe(val => {
        this.Entity = val;
        this.spinner.hide();
        if (isNullOrUndefined(this.Entity.Latitude) !== true) {
             this.addMarker();
        }
      },
      err => {
        alert('Not Found');
        this.spinner.hide();
      }
      );
    }

    if (isNullOrUndefined(this.Entity.Latitude) !== true) {
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

  /**
   * name
   */
  public AddNew() {

      const newEntity = new Vendor();

      const now = new Date;
      const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() ,
      now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

      newEntity.Id = 'VendorTest' + '_' + utc_timestamp.toString();

      this.Entity = newEntity;
  }

  public saveGPS() {

    if (!isNullOrUndefined(this.Entity.Longitude) && !isNullOrUndefined(this.Entity.Longitude)) {
      this.spinner.show();
      this.bcservice.updateGPS(this.Entity).subscribe(
        res => {
          alert('儲存GPS完畢');
          this.spinner.hide();
        },
        err => {
          alert('error');
          this.spinner.hide();
        }
      );
    } else {

      alert('Please enter GPS info');

    }


  }


 public  SaveEntity() {

    if (isNullOrUndefined(this.Entity.Company) || this.Entity.Company === '') {
       alert('請輸入名稱欄位');
       return;
     }

      this.spinner.show();

      if (this.isAdd === true) {

        this.bcservice.postEntity(this.Entity).subscribe(
          res => {
             alert('新增完畢');
             this.spinner.hide();
             window.open('#/bccenter');
         },
          err => {
            alert(err);
            this.spinner.hide();
          }
        );

      } else {

        this.bcservice.updateEntity(this.Entity).subscribe(
          res => {
             alert('更新完畢');
             this.spinner.hide();
           //  window.open('#/bccenter');
         },
          err => {
            alert(err);
            this.spinner.hide();
          }
        );

      }


 }

 public dropped(files: NgxFileDropEntry[]) {

  this.files = files;
  for (const droppedFile of files) {

    // Is it a file?
    if (droppedFile.fileEntry.isFile) {
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      fileEntry.file((file: File) => {

        // Here you can access the real file
        console.log(droppedFile.relativePath, file);

        // You could upload it like this:
        const formData = new FormData();
        formData.append('image', file, droppedFile.relativePath);

        this.spinner.show();

        this.bcservice.postImage(this.Entity.Id, formData).subscribe(
          (val) => {
               this.spinner.hide();
               this.Entity.ImageUrls.push(file.name);
          },
          err => {
              alert('upload image error');
              this.spinner.hide();
          }
        );


      });
    } else {
      // It was a directory (empty directories are added, otherwise only files)
      const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
      console.log(droppedFile.relativePath, fileEntry);
    }
  }
}

public fileOver(event) {
  console.log(event);
}

public fileLeave(event) {
  console.log(event);
}

public RemoveImage(i: number) {

  const imagename = this.Entity.ImageUrls[i];

  if (confirm('Are you sure you want to delete ' + imagename + ' ?')) {

      this.bcservice.removeImage(this.Entity.Id, imagename).subscribe(val => {
        alert('Image Delete Complete');
        i++;

        const orginialItems = this.Entity.ImageUrls;
        const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
        this.Entity.ImageUrls = filterItems;
      },
      err => {
        alert('Image delete error');
      });

  }

}

openModal() {


  const initialState = {
        entity: this.Entity
    };

  this.bsModalRef = this.modalService.show(BcformmodalComponent, {initialState});

}

openBusinessHourModal() {
  const initialState = {
    entity: this.Entity
};

this.bsModalRef = this.modalService.show(BusinesshourmodalComponent, {initialState});

}

zoomIn() {
  if (this.zoom < this.options.maxZoom) { this.zoom++}
}

zoomOut() {
  if (this.zoom > this.options.minZoom) { this.zoom--}
}

addMarker() {

  this.markers = [];

 // const coord = this.Entity.Coordinates.split(',');
  this.markers.push({
    position: {
      lat: Number(this.Entity.Latitude),
      lng: Number(this.Entity.Longitude),
    },
    label: {
      color: 'red',
      text: this.Entity.Company + (this.markers.length + 1),
    },
    title: this.Entity.Company + (this.markers.length + 1),
    info: 'Marker info ' + (this.markers.length + 1),
    url: 'https://www.google.com/maps/place/' + this.Entity.Latitude + ',' + this.Entity.Longitude ,
    options: {
      animation: google.maps.Animation.DROP
    }
  });

  this.center = {
    lat: Number(this.Entity.Latitude),
    lng: Number(this.Entity.Longitude),
  };

}

public opengooglemap() {
  const url = 'https://www.google.com/maps/place/' + this.Entity.Latitude + ',' + this.Entity.Longitude;

  window.open(
     url
  );

}

}
