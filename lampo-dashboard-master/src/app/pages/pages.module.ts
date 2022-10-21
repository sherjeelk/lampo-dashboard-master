import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { ServiceComponent } from './service/service.component';
import { CouponsComponent } from './coupons/coupons.component';
import { OrdersComponent } from './orders/orders.component';
import { CitiesComponent } from './cities/cities.component';
import { AddNewServiceComponent } from './add-new-service/add-new-service.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AddNewCouponsComponent } from './add-new-coupons/add-new-coupons.component';
import { AddNewOrderComponent } from './add-new-order/add-new-order.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {
  NbCheckboxModule,
  NbDatepickerModule, NbInputModule, NbSelectModule,
  NbSpinnerModule
} from "@nebular/theme";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import { FilesComponent } from './files/files.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { SelectFileComponent } from './select-file/select-file.component';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {SharedModule} from "../shared/shared.module";
import {AddNewCityComponent} from "./add-new-cities/add-new-city.component";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {NgxFileDropModule} from "ngx-file-drop";
import { PagesComponent } from './pages.component';
import {RouterModule} from "@angular/router";
import {LayoutModule} from "../layout/layout.module";
import {PagesRoutingModule} from "./page-routing.module";
import { PricingComponent } from './pricing/pricing.component';
import { AddNewPricingComponent } from './add-new-pricing/add-new-pricing.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import { UsersComponent } from './users/users.component';
import { AddNewUsersComponent } from './add-new-users/add-new-users.component';
import {MatTabsModule} from "@angular/material/tabs";
import {PlaceOrderComponent} from "./place-order/place-order.component";
import {MatRadioModule} from "@angular/material/radio";
import {MatTooltipModule} from "@angular/material/tooltip";
// import {MatDialogRef} from "@angular/material/dialog";
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";

// @ts-ignore
// @ts-ignore
@NgModule({
  declarations: [
    ProductComponent,
    ServiceComponent,
    CouponsComponent,
    OrdersComponent,
    CitiesComponent,
    AddNewCityComponent,
    AddNewServiceComponent,
    AddNewProductComponent,
    AddNewCouponsComponent,
    AddNewOrderComponent,
    FilesComponent,
    FileUploadComponent,
    SelectFileComponent,
    PagesComponent,
    PricingComponent,
    AddNewPricingComponent,
    UsersComponent,
    AddNewUsersComponent,
    PlaceOrderComponent
  ],
    imports: [
        CommonModule,
        MatPaginatorModule,
        NbCheckboxModule,
        FormsModule,
        NbSpinnerModule,
        MatButtonModule,
        MatCardModule,
        MatSlideToggleModule,
        SharedModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        NgxFileDropModule,
        NbDatepickerModule,
        NbInputModule,
        NbSelectModule,
        RouterModule,
        PagesRoutingModule,
        LayoutModule,
        MatFormFieldModule,
        MatTabsModule,
        MatRadioModule,
        MatTooltipModule,
      MatDialogModule,
      // MatDialogRef

    ]
})
export class PagesModule { }
