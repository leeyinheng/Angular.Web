import { Component, OnInit } from '@angular/core';
import {Article, Page} from '../model/articlemodel';
import { ArticleService} from '../service/service.service';
 import {NgxSpinnerService} from 'ngx-spinner';
import {ActivatedRoute} from '@angular/router';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-articleshow',
  templateUrl: './articleshow.component.html',
  styleUrls: ['./articleshow.component.css']
})
export class ArticleshowComponent implements OnInit {

  _list: Article[] = [];

    get List(): Article[] {

        return this._list;

    }

    set List( value: Article[]) {


        this._list = value;

    }

    _entity: Article = new Article();

    get Entity(): Article {

        return this._entity;

    }

    set Entity( value: Article) {


        this._entity = value;

    }

  constructor(private service: ArticleService, private spinner: NgxSpinnerService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.GetList();
  }

 public GetList() {
  this.spinner.show();

  this.service.getList().subscribe(val => {
    this.List = val;
    this.spinner.hide();
  },
  err => {
    alert('Not Found');
    this.spinner.hide();
  });

  }

  filterForArticles(filterVal: string) {
    
    if (filterVal === '-1') {

    } else {

     this.Entity = this.List[Number(filterVal)];
    }

  }

}
