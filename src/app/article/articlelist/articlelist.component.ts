import { Component, OnInit } from '@angular/core';
import {Article, Page} from '../model/articlemodel';
import { ArticleService} from '../service/service.service';
 import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';
import {AuthserviceService} from './../../core/shared/service/authservice.service';
import {Router} from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-articlelist',
  templateUrl: './articlelist.component.html',
  styleUrls: ['./articlelist.component.css']
})
export class ArticlelistComponent implements OnInit {

  _list: Article[] = [];

  get List(): Article[] {

      return this._list;

  }

  set List( value: Article[]) {


      this._list = value;

  }


  constructor(private service: ArticleService, private spinner: NgxSpinnerService, private route: ActivatedRoute,
    public authservice: AuthserviceService, private router: Router, private title: Title) { }

  ngOnInit() {

    this.title.setTitle('普洱茶交流協會');

    this.authservice.checktoken().subscribe( val =>{
      if (val === 'OK') {
        this.GetList();
      } else {
        alert('權限不足或失效 請重新登入');
        this.router.navigate(['login']);
      }
    } );

  }

  public GetList(): void {

    this.spinner.show();

    this.service.getList().subscribe(
        list => {
            this.List = list;
            this.spinner.hide();
        }
    );

  }

  public openform(Id: string) {
    window.open('#/articleform/' + Id, '_self');
  }

  public showarticle(Id: string) {
    window.open('#/articleshow/' + Id, '_blank');
  }



  public delete(Id: string) {

    if (confirm('確定刪除 ID: ' + Id + '?')) {

      this.List.forEach( (item, index) => {
        if (item.Id === Id) {
          this.List.splice(index, 1);
        }
      });

      this.service.deleteEntity(Id).subscribe(
        res => {
          console.log(res);
        },
        err => {
          alert(err);
        }
      );

    }
  }


}
