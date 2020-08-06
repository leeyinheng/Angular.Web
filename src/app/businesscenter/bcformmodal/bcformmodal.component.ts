import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { isNullOrUndefined } from 'util';
import { Feature, Vendor } from '../model/Inhub';
import {BcserviceService} from '../service/bcservice.service';


@Component({
  selector: 'app-bcformmodal',
  templateUrl: './bcformmodal.component.html',
  styleUrls: ['./bcformmodal.component.css']
})


export class BcformmodalComponent implements OnInit {




list: Feature[] = [  {
  name: '投影機',
  name_en: 'Projector',
  type: 'equip',
  image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/1/icon01.png',
  checked: false
},
{
name: '投影螢幕',
name_en: 'Projection Screen',
type: 'equip',
image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/2/icon02.png',
checked: false
},
{
name: '白板',
name_en: 'White Board',
type: 'equip',
image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/3/icon03.png',
checked: false
},

{
name: '事務機',
name_en: 'FAX/Print Machine',
type: 'equip',
image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/5/icon05.png',
checked: false
},
{
  name: 'WIFI',
  name_en: 'WIFI',
  type: 'equip',
  image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/4/icon04.png',
  checked: false
  },
  {
    name: '音響喇叭',
    name_en: 'Speakers',
    type: 'equip',
    image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/11/music-player.png',
    checked: false
    },
    {
      name: '麥克風',
      name_en: 'Microphone',
      type: 'equip',
      image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/12/microphone.png',
      checked: false
      },
      {
        name: '辦公桌椅',
        name_en: 'Work Desk & Chair',
        type: 'equip',
        image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/7/icon07.png',
        checked: false
      },
      {
        name: '咖啡飲料',
        name_en: 'Free Coffee & Tea',
        type: 'equip',
        image_url: 'http://inhub_dev.playplus.solutions/uploads/equipment/image/6/icon06.png',
        checked: false
        },
        {
          name: '微波爐',
          name_en: 'Ｍicrowave',
          type: 'equip',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/29/%EF%BC%A1-microwave_oven.png',
          checked: false
        },
        {
          name: '充電插座',
          name_en: 'Recharging',
          type: 'equip',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/28/A-plug.jpg',
          checked: false
        },
        {
          name: '冰箱',
          name_en: 'Refrigerator',
          type: 'equip',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/27/A-refrigerator.png',
          checked: false
        },
        {
          name: '門禁管理',
          name_en: 'Security System',
          type: 'equip',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/26/A-4_security.png',
          checked: false
        },
        {
          name: '置物櫃',
          name_en: 'Locker',
          type: 'equip',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/25/locker.png',
          checked: false
        }

];

list2: Feature[] = [
      {
        name: '會議室',
        name_en: 'Meeting Room',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/30/B1-meeting_room.png',
        checked: false
      },
      {
          name: '茶水間',
          name_en: 'Pantry Area',
          type: 'facility',
          image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/31/B2-pantry_area.png',
          checked: false
      },
      {
        name: '電話亭',
        name_en: 'Phone Booth',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/32/B3-phone_booth.png',
        checked: false
      },
      {
        name: '淋浴間',
        name_en: 'Shower Room',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/33/B4-shower_room.png',
        checked: false
      },
      {
        name: '休憩區',
        name_en: 'Shower Room',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/34/B5-relax_area.png',
        checked: false
      },
      {
        name: '洽談區',
        name_en: 'Meeting Area',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/35/B6-meeting_area.png',
        checked: false
      },
      {
        name: '陽台',
        name_en: 'Balcony',
        type: 'facility',
        image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/36/B7-balcony.png',
        checked: false
      }
    ];

list3: Feature[] = [
  {
    name: '秘書服務',
    name_en: 'Admin. Service',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/37/C1-secretary_.png',
    checked: false
  },
  {
    name: '訪客接待',
    name_en: 'Reception',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/38/C2-reception.png',
    checked: false
  },
  {
    name: '信件管理',
    name_en: 'Mail Handling',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/39/C3-mail_handling.png',
    checked: false
  },
  {
    name: '清潔服務',
    name_en: 'Cleaning',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/40/C4-cleaning.png',
    checked: false
  },
  {
    name: '舉辦活動',
    name_en: 'Events/Seminars',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/23/%E6%B4%BB%E5%8B%95.png',
    checked: false
  },
  {
    name: '會計計帳',
    name_en: 'Bookeeping',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/42/C7-accountant.png',
    checked: false
  },
  {
    name: '電話代接聽',
    name_en: 'Phone Answering',
    type: 'service',
    image_url: 'http://inhub.playplus.solutions/uploads/equipment/image/41/C6-phone_answering.png',
    checked: false
  }
];


  entity: Vendor;


  constructor(public bsModalRef: BsModalRef, private service: BcserviceService) { }

  ngOnInit() {

    if (isNullOrUndefined(this.entity) !== true) {
      this.entity.features.forEach((item) => {
        this.list.forEach((i) => {
          if (i.name === item.name) {
            i.checked = true;
          }
        });
        this.list2.forEach((i) => {
          if (i.name === item.name) {
            i.checked = true;
          }
        });
        this.list3.forEach((i) => {
          if (i.name === item.name) {
            i.checked = true;
          }
        });
      });

    }

  }

  public Save() {

      const newlist: Feature[] = [];

      this.cleanFeatures();

      this.list.forEach(function(item) {
          if (item.checked === true) {
            newlist.push(item);
          }

      });

      this.list2.forEach(function(item) {
        if (item.checked === true) {
          newlist.push(item);
        }
      });

      this.list3.forEach(function(item) {
        if (item.checked === true) {
          newlist.push(item);
        }
      });

       this.entity.features = newlist;

       this.addFeatures();

       this.bsModalRef.hide();

  }

  private cleanFeatures() {

     this.entity.features.forEach((item) => {
       this.service.deleteFeature(this.entity._id, item.name).subscribe(val => {
       },
       error => {
         alert('remove feature error');
       });
     });

  }

  private addFeatures() {

    this.entity.features.forEach((item) => {
      this.service.addFeature(this.entity._id, item).subscribe(val => {
      },
      err => {
        alert('add feature fail');
      });
    });
  }


}


