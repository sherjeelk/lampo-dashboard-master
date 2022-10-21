import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ApiService} from "../../services/api.service";
import {Cities} from "../../models/Cities";
import * as _ from "lodash";
import {Brands} from "../../models/Brands";
import {UtilService} from "../../services/utils.service";
import {MatDialog} from "@angular/material/dialog";
import {AddNewCityComponent} from "../add-new-cities/add-new-city.component";

@Component({
  selector: 'app-cities',
  templateUrl: './cities.component.html',
  styleUrls: ['./cities.component.scss']
})
export class CitiesComponent implements OnInit {
  public cities: Cities[] = [];

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
    this.getCitiesData();
  }

  getCitiesData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getCities(this.pages.start, this.pages.limit).subscribe(data => {
      this.progress = false;
      console.log('Brands', data);
      this.cities = data;
    }, error => {
      console.log('error', error.message);
    })
  }

  changePage($event: PageEvent) {
    console.log($event);
    this.pages.limit = $event.pageSize;
    this.pages.current = $event.pageIndex;
    this.pages.start = $event.pageIndex * $event.pageSize;
    this.getCitiesData(true);
  }


  /**
   *This function used to mark multiple entries
   * @param $event
   * @param city
   */
  checkAll($event: boolean, city?: Cities) {
    if (!city) {
      for (const place of this.cities) {
        place.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event) {
      setTimeout(() => {
        let del = false;
        for (const place of this.cities) {
          if (place.checked) {
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.cities, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.cities, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }

  /**
   * This function used to delete single and multiple entry
   * @param city
   */


  async askDelete(city?: Cities) {
    const msg = city ? 'You want to delete this city, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!city && this.deleteItems.length === 0) {
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.cities, item => item.checked), item => item.id);
    }
    if (confirm) {
      // call delete api
      try {
        const {status} = city ? await this.api.deleteCity(city.id.toString()).toPromise() : await this.api.deleteAllCities(this.deleteItems).toPromise();
        if (status === 1 || city) {
          this.util.presentToast(`${city || this.deleteItems.length === 1 ? 'City is' : 'Cities are'} deleted successfully!`, 1, 'City Delete');
          this.getCitiesData(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'City Delete');
      }
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddNewCityComponent, {
      width: '600px',
      data: {select: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getCitiesData(true);
    });

  }

  viewCity(city: Cities) {
    const dialogRef = this.dialog.open(AddNewCityComponent, {
      width: '600px',
      data: {city, selected: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getCitiesData(true);
    });

  }

}
