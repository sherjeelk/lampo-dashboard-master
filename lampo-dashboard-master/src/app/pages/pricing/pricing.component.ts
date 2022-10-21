import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import * as _ from "lodash";

import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {MatDialog} from "@angular/material/dialog";
import {Pricing} from "../../models/Pricing";
import {AddNewPricingComponent} from "../add-new-pricing/add-new-pricing.component";

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})
export class PricingComponent implements OnInit {
  pricings: Pricing[] = [];
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

  constructor(private api: ApiService, public util: UtilService, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getAllPricing();
  }

  getAllPricing() {
    this.progress = true
    this.api.getPricing().subscribe(data => {
        this.progress = false;
        this.pricings = data;
      }, error => this.util.presentToast('Error while adding pricing to your list', 0, 'Failed')
    );
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
    this.getAllPricing();
  }

  /**
   *This function used to mark multiple entries
   * @param $event
   * @param pricing
   */
  checkAll($event: boolean, pricing?: Pricing) {
    if (!pricing) {
      for (const prod of this.pricings) {
        prod.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event) {
      setTimeout(() => {
        let del = false;
        for (const prod of this.pricings) {
          if (prod.checked) {
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.pricings, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.pricings, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }


  /**
   * This function used to delete single and multiple entry
   * @param pricing
   */


  async askDelete(pricing?: Pricing) {
    const msg = pricing ? 'You want to delete this pricing, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!pricing && this.deleteItems.length === 0) {
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.pricings, item => item.checked), item => item.id);
    }
    if (confirm) {
      // call delete api
      try {
        const {status} = pricing ? await this.api.deletePricing(pricing.id.toString()).toPromise() : await this.api.deleteAllPricing(this.deleteItems).toPromise();
        if (status === 1 || pricing) {
          this.util.presentToast(`${pricing || this.deleteItems.length === 1 ? 'pricing is' : 'pricings are'} deleted successfully!`, 1, 'pricing Delete');
          this.getAllPricing();
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting pricing!', 0, 'pricing Delete');
      }
    }
  }

  viewOrder(pricing: any) {
    const dialogRef = this.dialog.open(AddNewPricingComponent, {
      width: '600px',
      data: {pricing, selected: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getAllPricing();
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddNewPricingComponent, {
      width: '600px',
      data: {select: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getAllPricing();
    });
  }

}
