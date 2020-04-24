import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleformComponent } from './articleform/articleform.component';
import { ArticlelistComponent } from './articlelist/articlelist.component';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from 'ngx-spinner';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ArticleshowComponent } from './articleshow/articleshow.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import {SharedModule} from '../core/shared/shared.module';
import { AuctionComponent } from './auction/auction.component';
import { IgxCarouselModule } from 'igniteui-angular';




@NgModule({
  declarations: [ArticleformComponent, ArticlelistComponent, ArticleshowComponent, AuctionComponent],
  providers: [

  ],
  imports: [
    CommonModule,
    FormsModule,

    HttpClientModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    FlexLayoutModule,
    NgbModule,
    SharedModule,
    IgxCarouselModule,
    CarouselModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'articleform', component: ArticleformComponent
      },
      {
        path: 'articlelist', component: ArticlelistComponent
      },
      {
        path: 'articleform/:id', component: ArticleformComponent
      },
      {
        path: 'articleshow', component: ArticleshowComponent
      },
      {
        path: 'articleshow/:id', component: ArticleshowComponent
      },
      {
        path: 'auction', component: AuctionComponent
      }
    ])
  ]
})
export class ArticleModule { }
