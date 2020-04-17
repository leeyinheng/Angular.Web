import { Component, OnInit, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { LinePairUser } from './../model/user';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-showdialog',
  templateUrl: './showdialog.component.html',
  styleUrls: ['./showdialog.component.css']
})
export class ShowdialogComponent implements OnInit {

  Entity: LinePairUser;

  Birthday = '';

  @ViewChild('screen', { static: false }) screen: ElementRef;
  @ViewChild('canvas', { static: true }) canvas: ElementRef;
  @ViewChild('downloadLink', { static: true }) downloadLink: ElementRef;


  constructor(private dialogRef: MatDialogRef<ShowdialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.Entity = data.entity;
    this.Birthday = this.Formatdate(this.Entity.Birthday.toString());

  }

  ngOnInit() {

  }

  public Formatdate(val: string) {
    return val.substring(0, 4);
  }

  public FormatName(val: string) {

    const lastName = val.substr(0, 1);

    if ( this.Entity.Gender === '男性') {
        return lastName + '先生';
    }

    if ( this.Entity.Gender === '女性') {
      return lastName + '小姐';
  }

  }

  public SalaryTerm(range: number) {
    switch (range) {
      case 1: {
        return '三萬以下';
        break;
      }
      case 2: {
        return '三萬到五萬';
        break;
      }
      case 3: {
        return '五萬到十萬';
        break;
      }
      case 4: {
        return '十萬到二十萬';
        break;
      }
      case 5: {
        return '二十萬以上';
        break;
      }
      default: {
        return '無資料';
        break;
      }
    }
  }

  public Cancel() {
    this.dialogRef.close(null);

  }

  public downloadImage() {

    html2canvas(this.screen.nativeElement, {
         useCORS: true
    }).then(canvas => {

      this.canvas.nativeElement.src = canvas.toDataURL();
      this.downloadLink.nativeElement.href = canvas.toDataURL('image/png');
      this.downloadLink.nativeElement.download = this.Entity.Name + '.png';
      this.downloadLink.nativeElement.click();

       this.dialogRef.close(null);
    });
  }

}
