import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap';
import { SharedModule } from './core/shared/shared.module';
import { TeagradeModule} from './teagrade/teagrade.module';
import { FuturewoodModule} from './futurewood/futurewood.module';

// Services
import { ListEmailService } from './Services/list-email.service';
import { CustomerlogService } from './Services/customerlog.service';
import { InvserviceService } from './clientinventory/invservice.service';

// Components
import { AppComponent } from './app.component';
import { StoneweightComponent } from './stoneweight.component';
import { CustomerlogComponent } from './customerlog.component';
import { ModalContentComponent } from './customerlog.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { EmailmodalComponent } from './emailmodal/emailmodal.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BusinesscenterModule } from './businesscenter/businesscenter.module';
import { ArticleModule } from './article/article.module';
import { ClientinventoryModule } from './clientinventory/clientinventory.module';
import { HealthModule } from './health/health.module';
import { IgxCarouselModule } from 'igniteui-angular';
import { MaterialModule } from './material-module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgbModule,
    SharedModule.forRoot(),
    ModalModule.forRoot(),
    RouterModule.forRoot([
      {
        path: '',
        redirectTo: '/stoneweight',
        pathMatch: 'full'
      },
      {
        path: 'stoneweight',
        component: StoneweightComponent
      },
      {
        path: 'customerlog',
        component: CustomerlogComponent
      }
    ]),
    BusinesscenterModule,
    ArticleModule,
    ClientinventoryModule,
    HealthModule,
    TeagradeModule,
    FuturewoodModule,
    IgxCarouselModule
  ],
  declarations: [
    AppComponent,
    StoneweightComponent,
    CustomerlogComponent,
    ModalContentComponent,
    EmailmodalComponent
  ],
  entryComponents: [ModalContentComponent, EmailmodalComponent],
  providers: [
    ListEmailService,
    CustomerlogService,
    BsModalService,
    InvserviceService,
    Title,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
