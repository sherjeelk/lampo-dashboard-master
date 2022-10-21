import { Component, OnInit } from '@angular/core';
import {AddNewCouponsComponent} from "../add-new-coupons/add-new-coupons.component";
import * as _ from "lodash";
import {Coupon} from "../../models/Coupon";
import {PageEvent} from "@angular/material/paginator";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {MatDialog} from "@angular/material/dialog";
import {Service} from "../../models/Service";
import {Cities} from "../../models/Cities";
import {AddNewCityComponent} from "../add-new-cities/add-new-city.component";

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit {


  services: Service[] = [];
  pages = {
    total: 0,
    current: 0,
    limit: 5,
    start: 0
  };
  coupons: Coupon[] = [];
  progress = false;
  deleteItems: string[] = [];
  deleteMultiple = false;
  allItems = false;
  constructor(private api: ApiService, public util: UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
    // this.getServiceCount();
    this.getAllCoupons();
  }


  changePage($event: PageEvent) {
    console.log($event);
    this.pages.limit = $event.pageSize;
    this.pages.current = $event.pageIndex;
    this.pages.start = $event.pageIndex * $event.pageSize;
    this.getAllCoupons(true);
  }


  getAllCoupons(updateData: boolean = false){
    this.progress = !updateData;
    this.api.getCoupons(this.pages.start, this.pages.limit).subscribe(data => {
      this.progress = false;
      this.coupons = data;
      console.log('Coupons', this.coupons);
    }, error => {
      console.log(error);
      this.util.presentToast(error.message, 0);
    });
  }
  /**
   * This method asks user if use wants to delete an entry or not
   * @param coupon If instance is passed it refers to one item else multiple selected items
   */
  async askDelete(coupon?: Coupon) {
    const msg = coupon ? 'You want to delete this coupon, this cannot be undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!coupon && this.deleteItems.length === 0){
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.coupons, item => item.checked), item => item.id);
    }
    if (confirm){
      // call delete api
      try {
        const {status} = coupon ? await this.api.deleteCoupons(coupon.id).toPromise() : await this.api.deleteAllCoupons(this.deleteItems).toPromise() ;
        if (status === 1 || coupon){
          this.util.presentToast(`${coupon || this.deleteItems.length === 1 ? 'Coupon is' : 'Coupons are'} deleted successfully!`, 1, 'Coupon Delete');
          this.getAllCoupons(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'Coupon Delete');
      }
    }
  }


  /**
   * This function can be used to mark multiple entries
   * @param $event
   * @param user
   */
  checkAll($event: boolean, user?: Coupon) {
    if (!user){
      for (const coupon of this.coupons){
        coupon.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event){
      setTimeout(() => {
        let del = false;
        for (const coupon of this.coupons){
          if (coupon.checked){
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.coupons, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.coupons, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }
  openDialog() {
    const dialogRef = this.dialog.open(AddNewCouponsComponent, {
      width: '600px',
      data: {select: true}
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result:`, result);
      this.getAllCoupons(true);
    });

  }

  viewCity(coupon: Coupon) {
    const dialogRef = this.dialog.open(AddNewCouponsComponent, {
      width: '600px',
      data: {coupon, selected: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getAllCoupons(true);
    });

  }

}
