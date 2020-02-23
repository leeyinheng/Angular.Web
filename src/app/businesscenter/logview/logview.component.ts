import { Component, OnInit } from '@angular/core';
import {InHubLog} from '../../core/shared/model/log';
import {BcserviceService} from '../service/bcservice.service';

@Component({
  selector: 'app-logview',
  templateUrl: './logview.component.html',
  styleUrls: ['./logview.component.css']
})
export class LogviewComponent implements OnInit {

  _list: InHubLog[];

    get List(): InHubLog[] {

        return this._list;

    }

    set List( value: InHubLog[]) {

        this._list = value;

    }

  constructor(private bcservice: BcserviceService) { }

  ngOnInit() {

      this.GetList();
  }

  public GetList(): void {


    this.bcservice.getLogs().subscribe(
        list => {
            this.List = list;
        }
    );

  }

}
