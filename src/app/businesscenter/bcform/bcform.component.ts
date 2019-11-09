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
  selector: 'app-bcform',
  templateUrl: './bcform.component.html',
  styleUrls: ['./bcform.component.css']
})
export class BcformComponent implements OnInit {
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

  public files: NgxFileDropEntry[] = [];


  zoom = 14;
  center: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    zoomControl: false,
    scrollwheel: true,
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
      this.AddNew();
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


    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });



    

  }

  /**
   * name
   */
  public AddNew() {

      const newEntity = new BusinessCenter();

      const now = new Date;
      const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() ,
      now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

      newEntity.Id = 'bc' + '-' + utc_timestamp.toString();

      this.Entity = newEntity;
  }


 public  SaveEntity() {

      this.spinner.show();

     this.bcservice.postEntity(this.Entity).subscribe(
      res => {
         alert('儲存完畢');
         this.addMarker();
         this.spinner.hide();
      },
      err => {
        alert(err);
        this.spinner.hide();
      }
    );

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
        formData.append(file.name, file, droppedFile.relativePath);

        this.spinner.show();

        this.bcservice.postImage(formData).subscribe(
          (val) => {

              const newImage = new BusinessCenterImage();
              newImage.Name = 'Image';
              newImage.Image_Url = val;
              if (this.Entity.Images === undefined) {
                 const images: BusinessCenterImage[] = [];
                 images.push(newImage);
                 this.Entity.Images = images;
              } else {
                this.Entity.Images.push(newImage);
              }

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

  i++;

  const orginialItems = this.Entity.Images;

  const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));

  this.Entity.Images = filterItems;
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

}

public opengooglemap() {
  const url = 'https://www.google.com/maps/place/' + this.Entity.Coordinates;

  window.open(
     url
  );

}

}
