import { Component, OnInit } from '@angular/core';
import {BusinessCenter} from '../model/BusinessCenter';
import {BcserviceService} from '../service/bcservice.service';


@Component({
  selector: 'app-bclist',
  templateUrl: './bclist.component.html',
  styleUrls: ['./bclist.component.css']
})
export class BclistComponent implements OnInit {

  constructor(private bcservice: BcserviceService) { }

  _list: BusinessCenter[];

    get List(): BusinessCenter[] {

        return this._list;

    }

    set List( value: BusinessCenter[]) {

        this._list = value;

    }

  ngOnInit() {
     this.GetList();
  }

  public GetList(): void {

    document.getElementById('loader').style.display = 'block';
    
    this.bcservice.getList().subscribe(
        list => {
            this.List = list;

            document.getElementById('loader').style.display = 'none';
        }
    );

  }

}
