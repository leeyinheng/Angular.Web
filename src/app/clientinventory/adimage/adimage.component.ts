import { Component, OnInit, ViewChild } from '@angular/core';
import {ImageLink} from '../../core/shared/model/ImageLink';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';
import {PostFileService} from './../../core/shared/service/postservice.service';
import {InvserviceService} from '../invservice.service';


@Component({
  selector: 'app-adimage',
  templateUrl: './adimage.component.html',
  styleUrls: ['./adimage.component.css']
})


export class AdimageComponent implements OnInit {

  public files: NgxFileDropEntry[] = [];

  public list: ImageLink[] = [];


  _textLInks: ImageLink[] = [];
  get textLInks():  ImageLink[]  {
      return this._textLInks;
  }

  set textLInks( value:  ImageLink[] ) {
      this._textLInks = value;
  }

  constructor(private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    public authservice: AuthserviceService,
    private router: Router, public postservice: PostFileService,
    private service: InvserviceService) { }

  ngOnInit() {

    this.authservice.checktoken().subscribe( val => {
      if (val !== 'OK') {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    });

    this.spinner.show();

    this.service.getAdImages().subscribe( res => {

      if (!isNullOrUndefined(res)) {
        this.list = res;
      }
      this.spinner.hide();
    },
    error => {
      alert ('內部錯誤');
      this.spinner.hide();
    });

    this.service.getAdTextLinks().subscribe( res => {

      if (!isNullOrUndefined(res)) {
        this.textLInks = res;
      }
      // this.spinner.hide();
    },
    error => {
      alert ('內部錯誤 (TextLinks)');
      this.spinner.hide();
    });

  }



  public  SaveEntity() {

      this.spinner.show();

     this.service.postAdImages(this.list).subscribe(
      res => {
         alert('廣告圖片連結儲存完畢');
         this.spinner.hide();
        // window.open('#/teaportal', '_self');
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

          if (file.size > 4194304)
          {
            alert(file.name + ' 已經大於4mb,請縮小後再上傳');
            return;
          }
          // You could upload it like this:
          const formData = new FormData();

          formData.append(file.name, file, droppedFile.relativePath);

          this.spinner.show();

          this.postservice.postImage(formData).subscribe(
            (val) => {

                const newImage = new ImageLink();
                newImage.Name = 'Title';
                newImage.Image_Url = val;

                const orginialItems = this.list;

                orginialItems.push(newImage);

                this.list = orginialItems.filter(x => x.Image_Url !== ''); // workaround wtih sorttable refresh

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

    const orginialItems = this.list;

    const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));

    this.list = filterItems;
  }

  public RemoveTextLink(i: number) {

    i++;

    const orginialItems = this.textLInks;

    const filterItems = orginialItems.slice(0, i - 1).concat(orginialItems.slice(i, orginialItems.length));

    this.textLInks = filterItems;
  }

  public AddNewTextLink() {

    const textlink = new ImageLink();

    textlink.Name = '廣告文案';
    textlink.Target_Url = '連結 url';

    const orginialItems = this.textLInks;

    orginialItems.push(textlink);

    this.textLInks = orginialItems.filter(x => x.Name !== '');  // workaround wtih sorttable refresh

  }

  public  SaveTextLinks() {

    this.spinner.show();

   this.service.postAdTextLinks(this.textLInks).subscribe(
    res => {
       alert('儲存廣告連結完畢');
       this.spinner.hide();
       // window.open('#/teaportal', '_self');
   },
    err => {
      alert(err);
      this.spinner.hide();
    }
  );
}





}
