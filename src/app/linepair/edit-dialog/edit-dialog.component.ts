import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef , MAT_DIALOG_DATA } from '@angular/material';
import {LinePairUser} from './../model/user';
import {LinepairserviceService} from '../service/linepairservice.service';
import {NgxSpinnerService} from 'ngx-spinner';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {PostFileService} from '../../../app/core/shared//service/postservice.service';


@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  Entity: LinePairUser;


  constructor(private dialogRef: MatDialogRef<EditDialogComponent>,
    private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private postservice: PostFileService,
    @Inject(MAT_DIALOG_DATA) data) {
      this.Entity = data;
    }

  ngOnInit() {

  }

  public Save() {

    this.spinner.show();

    this.service.updateEntity(this.Entity).subscribe(
      val => {
        alert('更新完成');
        this.spinner.hide();
        this.dialogRef.close(null);
      },
      err => {
        alert('發生錯誤 ' + err);
        this.spinner.hide();
        this.dialogRef.close(null);
      }
    );

  }

  public Cancel() {
    this.dialogRef.close(null);
  }

  public dropped(files: NgxFileDropEntry[]) {


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

          this.postservice.postImage(formData).subscribe(
            (val) => {
                 this.spinner.hide();
                 this.Entity.ImgLink = val;
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

}
