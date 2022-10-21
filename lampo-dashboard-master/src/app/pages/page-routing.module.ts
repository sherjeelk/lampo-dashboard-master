import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {PagesComponent} from "./pages.component";
import {CitiesComponent} from "./cities/cities.component";
import {OrdersComponent} from "./orders/orders.component";
import {ProductComponent} from "./product/product.component";
import {ServiceComponent} from "./service/service.component";
import {FilesComponent} from "./files/files.component";
import {CouponsComponent} from "./coupons/coupons.component";
import {PricingComponent} from "./pricing/pricing.component";
import {UsersComponent} from "./users/users.component";
import {PlaceOrderComponent} from "./place-order/place-order.component";
import {AddNewOrderComponent} from "./add-new-order/add-new-order.component";

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        component: CouponsComponent
      },
      {
        path: 'users',
        component: UsersComponent
      },
      {
        path: 'services',
        component: ServiceComponent
      },
      {
        path: 'cities',
        component: CitiesComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'product',
        component: ProductComponent
      },
      {
        path: 'service',
        component: ServiceComponent
      },
      {
        path: 'files',
        component: FilesComponent
      },
      {
        path: 'pricing',
        component: PricingComponent
      },
      {
        path: 'place-order',
        component: PlaceOrderComponent
      },

      {
        path: 'add-new-order',
        component: AddNewOrderComponent
      },

      {
        path: 'view-order/:id',
        component: AddNewOrderComponent
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {
}
