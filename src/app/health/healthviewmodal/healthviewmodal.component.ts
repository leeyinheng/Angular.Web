import { Component, OnInit } from '@angular/core';
import {UserInfo, HealthInfo, HealthHistory, BloodPressure, Meal} from '../../core/shared/model/userinfo';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {HealthserviceService} from './../service/healthservice.service';

@Component({
  selector: 'app-healthviewmodal',
  templateUrl: './healthviewmodal.component.html',
  styleUrls: ['./healthviewmodal.component.css']
})
export class HealthviewmodalComponent implements OnInit {

  _entity: UserInfo<HealthInfo, HealthHistory > = new UserInfo<HealthInfo, HealthHistory >();

  get Entity(): UserInfo<HealthInfo, HealthHistory > {
      return this._entity;
  }

  set Entity( value: UserInfo<HealthInfo, HealthHistory >) {
      this._entity = value;
  }

  History: HealthHistory;

  CurrentTemp = 0;

  Mode = 'Add';

  public files: NgxFileDropEntry[] = [];


  constructor(public bsModalRef: BsModalRef, private spinner: NgxSpinnerService, private service: HealthserviceService) { }

  ngOnInit() {

    this.service.getTemp().subscribe( val => {

      this.CurrentTemp = val.main.temp;

    });

  }

  public newblood() {
    const newblood = new BloodPressure();
    const now = new Date;
    newblood.DateTime = now.toLocaleString();
    newblood.Comment = this.CurrentTemp.toString();
    this.History.BloodPressures.push(newblood);
  }



  public removeblood(i: number) {

    i++;

    const orginialItems = this.History.BloodPressures;
    const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
    this.History.BloodPressures = filterItems;

  }

  public removeMeal(i: number) {

    i++;

    const orginialItems = this.History.Meals;
    const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));
    this.History.Meals = filterItems;

  }

  public save() {

    if (this.Mode === 'Add') {
      this.Entity.InfoHistory.unshift(this.History);
    }
     this.bsModalRef.hide();
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

      //  if (file.size > 4194304)
      //  {
      //    alert(file.name + ' 已經大於4mb,請縮小後再上傳');
      //    return;
      //  }

        // You could upload it like this:
        const formData = new FormData();
        formData.append(file.name, file, droppedFile.relativePath);

        this.spinner.show();

        this.service.postImage(formData).subscribe(
          (val) => {

              const newImage = new Meal();
              newImage.Name = 'Meal';
              newImage.ImageLink = val;
              newImage.DateTime = new Date().toLocaleString();
              this.History.Meals.unshift(newImage);

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

}
