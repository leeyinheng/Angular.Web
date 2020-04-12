import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { RouterModule } from '@angular/router';
import {NgxSpinnerModule} from 'ngx-spinner';
import { MaterialModule } from '../material-module';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { SharedModule} from './../../app/core/shared/shared.module';
import { NgxFileDropModule } from 'ngx-file-drop';
import { EditDialogComponent } from './edit-dialog/edit-dialog.component';
import { LoveComponent } from './love/love.component';
import { PaymentdialogComponent } from './paymentdialog/paymentdialog.component';
import { ArrangedialogComponent } from './arrangedialog/arrangedialog.component';
import { ShowComponent } from './show/show.component';
@NgModule({
  declarations: [ListComponent, FormComponent, EditDialogComponent, LoveComponent, PaymentdialogComponent, ArrangedialogComponent, ShowComponent],
  imports: [
    CommonModule,
    FormsModule, ReactiveFormsModule,
    NgxSpinnerModule,
    MaterialModule,
    SharedModule,
    NgxFileDropModule,
     RouterModule.forChild([
      {
        path: 'linepairlist', component: ListComponent
      },
      {
        path: 'linepair', component: FormComponent
      },
      {
        path: 'linepairlove', component: LoveComponent
      }
    ])
  ],
  entryComponents: [
    EditDialogComponent,
    PaymentdialogComponent,
    ArrangedialogComponent
  ]
})
export class LinepairModule { }
