import { Component, OnInit } from '@angular/core';
import {LinePairUser} from './../model/user';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import {NgxSpinnerService} from 'ngx-spinner';
import {LinepairserviceService} from '../service/linepairservice.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PostFileService} from '../../../app/core/shared//service/postservice.service';
import {Router} from '@angular/router';
import {EmailService} from '../../Services/emailservice';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  forthFormGroup: FormGroup;
  showInput = false;
  showInputVal = '';
  uploadImage = false;

  _entity: LinePairUser = new LinePairUser();

    get Entity(): LinePairUser {

        return this._entity;

    }

    set Entity( value: LinePairUser) {


        this._entity = value;

    }

  public files: NgxFileDropEntry[] = [];



  constructor(private service: LinepairserviceService,
    private spinner: NgxSpinnerService,
    private _formBuilder: FormBuilder,
    private postservice: PostFileService,
    private router: Router,
    private emailservice: EmailService
     ) { }

  ngOnInit() {

    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
      otherCtrl: ['', Validators.nullValidator]
    });

    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
      other2Ctrl: ['', Validators.nullValidator]
    });

    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required],
      other3Ctrl: ['', Validators.nullValidator]
    });

    this.forthFormGroup = this._formBuilder.group({
      forthCtrl: ['', Validators.required],
      other4Ctrl: ['', Validators.nullValidator]
    });

    this.AddNew();
  }

  public CheckInput() {
    if (this.Entity.City === '其他') {
      this.showInput = true;

    } else {
      this.showInput = false;
    }

  }

  public AddNew() {

    const newEntity = new LinePairUser();

    const now = new Date;
    const utc_timestamp = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate() ,
    now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds());

    newEntity.Id = 'LinePair' + '_' + utc_timestamp.toString();
    newEntity.ImgLink = 'https://leecloud.blob.core.windows.net/image/profile.png';

    this.Entity = newEntity;

  }

  public  SaveEntity() {

        if (this.uploadImage === false) {
          alert('您還沒上傳照片,還不能上傳資料喔!');
          return;
        }

         this.spinner.show();

         if (this.showInput) {
           this.Entity.City = this.showInputVal;
         }

         if (this.Entity.Gender === '女性') {
           this.Entity.Membership = 2; // 會員
         }

        this.service.postEntity(this.Entity).subscribe(
          res => {
             alert('上傳成功!');
             this.SendEmail();
             this.spinner.hide();
             this.router.navigate(['linepairlove'], { queryParams: { gender: this.Entity.Gender } });
         },
          err => {
            alert(err);
            this.spinner.hide();
          }
        );

      }

  public SendEmail() {

    const fromemail = 'Line Pair 服務 <ilovelinepair@gmail.com>';

    const toemail = this.Entity.Email;

    const subject = '歡迎 【Line Pair】 的新朋友! ' + this.Entity.Name + ' ID: ' + this.Entity.Id;

    let url = '';

    if (this.Entity.Gender === '男生') {
      url = encodeURIComponent('"https://leecloud.blob.core.windows.net/image/linepair_men_email.jpg"');
    } else {
      url = encodeURIComponent('"https://leecloud.blob.core.windows.net/image/linepair_ladies_email.jpg"');
    }


    const message = '<div> <img src= ' + url + '> </div>';

    this.emailservice.sendemail(fromemail, toemail, subject, message);

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

          this.postservice.postImage(formData).subscribe(
            (val) => {
                 this.spinner.hide();
                 this.Entity.ImgLink = val;
                 this.uploadImage = true;
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
