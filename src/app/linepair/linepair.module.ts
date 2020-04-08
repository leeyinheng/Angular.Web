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
@NgModule({
  declarations: [ListComponent, FormComponent, EditDialogComponent],
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
      }
    ])
  ],
  entryComponents: [
    EditDialogComponent
  ]
})
export class LinepairModule { }
