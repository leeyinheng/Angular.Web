import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {BusinessCenter, BusinessCenterFeature} from '../model/BusinessCenter';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-bcformmodal',
  templateUrl: './bcformmodal.component.html',
  styleUrls: ['./bcformmodal.component.css']
})
export class BcformmodalComponent implements OnInit {


  list: BusinessCenterFeature[] = [  {
    Name: '投影機',
    Comment: '',
    Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/1/icon01.png',
    Checked: false
},
{
  Name: '螢幕',
  Comment: '',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/2/icon02.png',
  Checked: false
},
{
  Name: '白板',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/3/icon03.png',
  Checked: false
},
{
  Name: 'WIFI',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/4/icon04.png',
  Checked: false
},
{
  Name: '事務機',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/5/icon05.png',
  Checked: false
},
{
  Name: '咖啡飲料',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/6/icon06.png',
  Checked: false
},
{
  Name: '桌子',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/7/icon07.png',
  Checked: false
},
{
  Name: '椅子',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/8/icon08.png',
  Checked: false
},
{
  Name: '音響喇叭',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/11/music-player.png',
  Checked: false
},
{
  Name: '麥克風',
  Comment: 'Comment',
  Image_Url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/12/microphone.png',
  Checked: false
}];

  entity: BusinessCenter;


  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {

    if (isNullOrUndefined(this.entity.Features) !== true) {
      this.entity.Features.forEach((item) => {
        this.list.forEach((i) => {
          if(i.Name === item.Name){
            i.Checked = true;
          }
        });
      });

    }

  }

  public Save() {

      const newlist: BusinessCenterFeature[] = [];

      this.list.forEach(function(item) {
          if (item.Checked === true) {
            newlist.push(item);
          }

      });

      this.entity.Features = newlist;

       this.bsModalRef.hide();

  }


}


