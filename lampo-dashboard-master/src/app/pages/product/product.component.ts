import { Component, OnInit } from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ApiService} from "../../services/api.service";
import {Products} from "../../models/Products";
import {UtilService} from "../../services/utils.service";
import * as _ from 'lodash';
import {Cities} from "../../models/Cities";
import {AddNewOrderComponent} from "../add-new-order/add-new-order.component";
import {Order} from "../../models/Order";
import {MatDialog} from "@angular/material/dialog";
import {AddNewProductComponent} from "../add-new-product/add-new-product.component";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  public products: Products[] = [];
  pages = {
    total: 0,
    current: 0,
    limit: 5,
    start: 0
  };

  progress = false;
  deleteItems: number[] = [];
  deleteMultiple = false;
  allItems = false;

  constructor(private api: ApiService, public util: UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getProductData();
  }


  getProductData(updateData: boolean = false){
    this.progress = !updateData;
    this.api.getProducts(this.pages.start, this.pages.limit).subscribe( data => {
      this.progress = false;
      console.log('product', data);
      this.products = data;
    }, error => {
      console.log('error', error.message);
    })
  }

  /**
   * This function used to set page limit to show data
   * @param $event
   */

  changePage($event: PageEvent) {
    console.log($event);
    this.pages.limit = $event.pageSize;
    this.pages.current = $event.pageIndex;
    this.pages.start = $event.pageIndex * $event.pageSize;
    this.getProductData(true);
  }

  /**
   *This function used to mark multiple entries
   * @param $event
   * @param product
   */
  checkAll($event: boolean, product?: Products) {
    if (!product){
      for (const prod of this.products){
        prod.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event){
      setTimeout(() => {
        let del = false;
        for (const prod of this.products){
          if (prod.checked){
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.products, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.products, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }


  /**
   * This function used to delete single and multiple entry
   * @param product
   */


  async askDelete(product?: Products) {
    const msg = product ? 'You want to delete this product, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!product && this.deleteItems.length === 0){
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.products, item => item.checked), item => item.id);
    }
    if (confirm){
      // call delete api
      try {
        const {status} = product ? await this.api.deleteProduct(product.id.toString()).toPromise() : await this.api.deleteAllProduct(this.deleteItems).toPromise() ;
        if (status === 1 || product){
          this.util.presentToast(`${product || this.deleteItems.length === 1 ? 'Product is' : 'Products are'} deleted successfully!`, 1, 'Product Delete');
          this.getProductData(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'Product Delete');
      }
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '600px',
      height: '550px',
      data: {select: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getProductData(true);
    });

  }

  viewOrder(product: Products) {
    const dialogRef = this.dialog.open(AddNewProductComponent, {
      width: '600px',
      height: '600px',
      data: {product, selected: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getProductData(true);
    });

  }


}
