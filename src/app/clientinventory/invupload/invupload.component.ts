import { Component, OnInit } from '@angular/core';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';

@Component({
  selector: 'app-invupload',
  templateUrl: './invupload.component.html',
  styleUrls: ['./invupload.component.css']
})
export class InvuploadComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private service: InvserviceService) { }

  ngOnInit() {
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
          this.service.postFile(formData).subscribe(
            (val) => {
                  alert(val);
                  this.spinner.hide();
            }
          );
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.spinner.hide();
      }
    }
  }


  public dropped2(files: NgxFileDropEntry[]) {

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
          this.service.postTempImage(formData).subscribe(
            (val) => {
                  alert(val);
                  this.spinner.hide();
            }
          );
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
        this.spinner.hide();
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
