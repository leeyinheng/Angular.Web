import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthserviceService } from './service/authservice.service';
import {CryptserviceService} from './service/cryptservice.service';
import { PostFileService} from './service/postservice.service';
import {NewsserviceService} from './service/newsservice.service';
import { EmailService } from '../../Services/emailservice';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [ AuthserviceService, CryptserviceService, PostFileService, NewsserviceService, EmailService ]
    };
  }

}
