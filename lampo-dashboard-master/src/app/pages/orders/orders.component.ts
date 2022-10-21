import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ApiService} from "../../services/api.service";
import {Order} from "../../models/Order";
import * as _ from "lodash";
import {UtilService} from "../../services/utils.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewOrderComponent} from "../add-new-order/add-new-order.component";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  public orders: Order[] = [];

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

  constructor(private api: ApiService, public util: UtilService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getOrdersData();
  }

  getOrdersData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getOrders(this.pages.start, this.pages.limit).subscribe(data => {
      this.progress = false;
      console.log('Order', data);
      this.orders = data;

    }, error => {
      console.log('error', error.message);
    })
  }

  changePage($event: PageEvent) {
    console.log($event);
    this.pages.limit = $event.pageSize;
    this.pages.current = $event.pageIndex;
    this.pages.start = $event.pageIndex * $event.pageSize;
    this.getOrdersData(true);
  }

  /**
   *This function used to mark multiple entries
   * @param $event
   * @param order
   */
  checkAll($event: boolean, order?: Order) {
    if (!order) {
      for (const prod of this.orders) {
        prod.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event) {
      setTimeout(() => {
        let del = false;
        for (const prod of this.orders) {
          if (prod.checked) {
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.orders, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.orders, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }

  async askDelete(order?: Order) {
    const msg = order ? 'You want to delete this order, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!order && this.deleteItems.length === 0) {
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.orders, item => item.checked), item => item.id);
    }
    if (confirm) {
      // call delete api
      try {
        const {status} = order ? await this.api.deleteOrder(order.id.toString()).toPromise() : await this.api.deleteAllOrders(this.deleteItems).toPromise();
        if (status === 1 || order) {
          this.util.presentToast(`${order || this.deleteItems.length === 1 ? 'Order is' : 'Orders are'} deleted successfully!`, 1, 'Order Delete');
          this.getOrdersData(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'Order Delete');
      }
    }
  }


  // openDialog() {
  //   const dialogRef = this.dialog.open(AddNewOrderComponent, {
  //     width: '600px',
  //     height: '624px',
  //     data: {select: true}
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result:`, result);
  //     this.getOrdersData(true);
  //   });
  //
  // }
  private queryParams: any;

  viewOrder(order: Order) {
    // const dialogRef = this.dialog.open(AddNewOrderComponent, {
    //   width: '600px',
    //   height: '613px',
    //   data: {order, selected: true}
    // });
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result:`, result);
    //   this.getOrdersData(true);
    // });
    this.router.navigateByUrl('/pages/view-order/' + order.id);

  }

  newOrder() {
    // this.router.navigateByUrl('pages/add-new-order');
    this.router.navigate(['/pages/add-new-order']);
  }

}
