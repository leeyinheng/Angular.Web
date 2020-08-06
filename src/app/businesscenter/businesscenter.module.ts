import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import {ModalModule, BsModalService} from 'ngx-bootstrap';
import { BclistComponent } from './bclist/bclist.component';
import { BcformComponent } from './bcform/bcform.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import {NgxSpinnerModule} from 'ngx-spinner';
import { BcformmodalComponent } from './bcformmodal/bcformmodal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { GoogleMapsModule } from '@angular/google-maps';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { UserlistComponent } from './userlist/userlist.component';
import { UserformComponent } from './userform/userform.component';
import {BcserviceService} from './service/bcservice.service';
import { LogviewComponent } from './logview/logview.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ModalModule,
    NgxFileDropModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    NgbModule,
    GoogleMapsModule,
    CarouselModule.forRoot(),
    TooltipModule.forRoot(),
    RouterModule.forChild([
      {
        path: 'bccenter', component: BclistComponent
      },
      {
        path: 'bcform/:id', component: BcformComponent
      },
      {
        path: 'bcform', component: BcformComponent
      },
      {
        path: 'bcuser', component: UserlistComponent
      },
      {
        path: 'bcuserform', component: UserformComponent
      },
      {
        path: 'bcuserform/:id', component: UserformComponent
      },
      {
        path: 'InHubLog', component: LogviewComponent
      },
      {
        path: 'bclogin', component: LoginComponent
      }
    ])
  ],
  declarations: [BclistComponent, BcformComponent, BcformmodalComponent,
     UserlistComponent,
     UserformComponent,
     LogviewComponent,
     LoginComponent],
  entryComponents: [BcformmodalComponent],
  providers: [BcserviceService]

})
export class BusinesscenterModule { }

