import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {BusinessCenter, BusinessCenterFeature} from '../model/BusinessCenter';
import { isNullOrUndefined } from 'util';
import { Feature, Vendor } from '../model/Inhub';
import {BcserviceService} from '../service/bcservice.service';


@Component({
  selector: 'app-bcformmodal',
  templateUrl: './bcformmodal.component.html',
  styleUrls: ['./bcformmodal.component.css']
})


export class BcformmodalComponent implements OnInit {


//   list: BusinessCenterFeature[] = [  {
//     Name: '投影機',
//     Comment: '',
//     Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/1/icon01.png',
//     Checked: false
// },
// {
//   Name: '螢幕',
//   Comment: '',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/2/icon02.png',
//   Checked: false
// },
// {
//   Name: '白板',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/3/icon03.png',
//   Checked: false
// },
// {
//   Name: 'WIFI',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/4/icon04.png',
//   Checked: false
// },
// {
//   Name: '事務機',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/5/icon05.png',
//   Checked: false
// },
// {
//   Name: '咖啡飲料',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/6/icon06.png',
//   Checked: false
// },
// {
//   Name: '桌子',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/7/icon07.png',
//   Checked: false
// },
// {
//   Name: '椅子',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/8/icon08.png',
//   Checked: false
// },
// {
//   Name: '音響喇叭',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/11/music-player.png',
//   Checked: false
// },
// {
//   Name: '麥克風',
//   Comment: 'Comment',
//   Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/12/microphone.png',
//   Checked: false
// }];

// Type – string [value can only be one the three options – equip, facility, service]

list: Feature[] = [  {
  Name: '投影機',
  Name_en: 'Projector',
  Type: 'equip',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/1/icon01.png',
  Checked: false
},
{
Name: '螢幕',
Name_en: 'Screen',
Type: 'equip',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/2/icon02.png',
Checked: false
},
{
Name: '白板',
Name_en: 'White Board',
Type: 'equip',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/3/icon03.png',
Checked: false
},
{
Name: 'WIFI',
Name_en: 'WIFI',
Type: 'facility',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/4/icon04.png',
Checked: false
},
{
Name: '事務機',
Name_en: 'FAX/Print Machine',
Type: 'equip',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/5/icon05.png',
Checked: false
},
{
Name: '咖啡飲料',
Name_en: 'Coffee/Drinks',
Type: 'service',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/6/icon06.png',
Checked: false
},
{
Name: '桌子',
Name_en: 'Desk',
Type: 'facility',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/7/icon07.png',
Checked: false
},
{
Name: '椅子',
Name_en: 'Chair',
Type: 'facility',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/8/icon08.png',
Checked: false
},
{
Name: '音響喇叭',
Name_en: 'Speakers',
Type: 'facility',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/11/music-player.png',
Checked: false
},
{
Name: '麥克風',
Name_en: 'Mic',
Type: 'facility',
Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/12/microphone.png',
Checked: false
}];

  entity: Vendor;


  constructor(public bsModalRef: BsModalRef, private service: BcserviceService) { }

  ngOnInit() {

    if (isNullOrUndefined(this.entity) !== true) {
      this.entity.Features.forEach((item) => {
        this.list.forEach((i) => {
          if (i.Name === item.Name) {
            i.Checked = true;
          }
        });
      });

    }

  }

  public Save() {

      const newlist: Feature[] = [];

      this.cleanFeatures();

      this.list.forEach(function(item) {
          if (item.Checked === true) {
            newlist.push(item);
          }

      });

       this.entity.Features = newlist;

       this.addFeatures();

       this.bsModalRef.hide();

  }

  private cleanFeatures() {

     this.entity.Features.forEach((item) => {
       this.service.deleteFeature(this.entity.Id, item.Name).subscribe(val => {
       },
       error => {
         alert('remove feature error');
       });
     });

  }

  private addFeatures() {
    this.entity.Features.forEach((item) => {
      this.service.addFeature(this.entity.Id, item).subscribe(val => {
      },
      err => {
        alert('add feature fail');
      });
    });
  }


}


