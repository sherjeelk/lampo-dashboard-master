import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputErrorComponent } from './input-error/input-error.component';
import { NameComponent } from './name/name.component';
import { HumanDatePipe } from './pipe/human-date.pipe';
import { SafeUrlPipe } from './pipe/safe-url.pipe';
import { TruncatePipe } from './pipe/truncate.pipe';
import {MatMenuModule} from "@angular/material/menu";



@NgModule({
  declarations: [
    InputErrorComponent,
    NameComponent,
    HumanDatePipe,
    SafeUrlPipe,
    TruncatePipe
  ],
  exports: [
    InputErrorComponent,
    NameComponent,
    HumanDatePipe,
    TruncatePipe,
    SafeUrlPipe
  ],
  imports: [
    CommonModule,
    MatMenuModule
  ]
})
export class SharedModule { }
