import { Component, OnInit } from '@angular/core';
import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {InvserviceService} from '../invservice.service';
import {Inventory, ClientInventory, ProjectImages} from '../model/projectinventory';


@Component({
  selector: 'app-invshow',
  templateUrl: './invshow.component.html',
  styleUrls: ['./invshow.component.css']
})
export class InvshowComponent implements OnInit {

  _entity: ClientInventory = new ClientInventory();

  get Entity(): ClientInventory {

      return this._entity;

  }

  set Entity( value: ClientInventory) {


      this._entity = value;

  }

  images: ProjectImages[];

  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private service: InvserviceService) { }

  ngOnInit() {

    const ID: string = this.route.snapshot.paramMap.get('id');

    this.GetEntity(ID);

    this.GetProjectImages();

  }

  public GetEntity(ID: string) {
    this.spinner.show();

    this.service.getEntityById(ID).subscribe(val => {
      this.Entity = val;
      this.spinner.hide();
    },
    err => {
      alert('Not Found');
      this.spinner.hide();
    });

    }

    public GetProjectImages() {

      this.service.getImages().subscribe(val => {
        this.images = val;
      },
      err => {
        alert('溫度圖error');
      });
    }

}
