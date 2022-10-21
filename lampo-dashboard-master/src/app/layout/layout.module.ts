import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { OneColumnComponent } from './one-column/one-column.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import {LayoutRoutingModule} from "./layout-routing.module";
import {
  NbActionsModule,
  NbIconModule,
  NbLayoutModule,
  NbSidebarModule
} from "@nebular/theme";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        FooterComponent,
        HeaderComponent,
        OneColumnComponent,
        SideMenuComponent,

    ],
  exports: [
    OneColumnComponent,
    SideMenuComponent
  ],
    imports: [
        CommonModule,
        LayoutRoutingModule,
        NbActionsModule,
        NbIconModule,
        SharedModule,
        NbLayoutModule,
        NbSidebarModule,
        RouterModule
    ]
})
export class LayoutModule { }
