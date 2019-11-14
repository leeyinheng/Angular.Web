import { Component, OnInit } from '@angular/core';
import {Article, Page} from '../model/articlemodel';
import { ArticleService} from '../service/service.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-articleform',
  templateUrl: './articleform.component.html',
  styleUrls: ['./articleform.component.css']
})
export class ArticleformComponent implements OnInit {

  _entity: Article = new Article();

    get Entity(): Article {

        return this._entity;

    }

    set Entity( value: Article) {


        this._entity = value;

    }

  public files: NgxFileDropEntry[] = [];


  constructor(private service: ArticleService, private spinner: NgxSpinnerService, private route: ActivatedRoute) {
     console.log(this.route.snapshot.paramMap.get('id')); }

  ngOnInit() {

    this.spinner.show();

    const ID: string = this.route.snapshot.paramMap.get('id');


    if (isNullOrUndefined(ID)) {
      this.AddNew();
      this.spinner.hide();
    } else {
      this.service.getEntityById(ID).subscribe(val => {
        this.Entity = val;
        this.spinner.hide();
      },
      err => {
        alert('Not Found');
        this.spinner.hide();
      }
      );
    }


  }

  public AddNew() {

    const newEntity = new Article();

    const now = new Date;
    const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() ,
    now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    newEntity.Id = 'tea' + '-' + utc_timestamp.toString();

    this.Entity = newEntity;
}

public  SaveEntity() {

  if (isNullOrUndefined(this.Entity.Title)) {
     alert('請輸入名稱');
     return;
   }

 
    this.spinner.show();

   this.service.postEntity(this.Entity).subscribe(
    res => {
       alert('儲存完畢');

      // if (isNullOrUndefined(this.Entity.Coordinates) !== true) {
      //  this.addMarker();
      // }

       this.spinner.hide();

       window.open('#/articlelist', '_self');

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

        this.service.postImage(formData).subscribe(
          (val) => {

              const newImage = new Page();
              newImage.Name = 'Page';
              newImage.Image_Url = val;
              if (isNullOrUndefined(this.Entity.Pages)) {
                 const images: Page[] = [];
                 images.push(newImage);
                 this.Entity.Pages = images;
              } else {
                this.Entity.Pages.push(newImage);
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

  const orginialItems = this.Entity.Pages;

  const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));

  this.Entity.Pages = filterItems;
}





}
