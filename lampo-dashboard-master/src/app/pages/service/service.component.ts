import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {ApiService} from "../../services/api.service";
import {Services} from "../../models/Services";
import * as _ from "lodash";
import {UtilService} from "../../services/utils.service";
import {AddNewServiceComponent} from "../add-new-service/add-new-service.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  public services: Services[] = [];

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
    this.getServiceData();
  }

  getServiceData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getServices(this.pages.start, this.pages.limit).subscribe(data => {
      console.log('services', data);
      this.services = data;
      this.progress = updateData;

    }, error => {
      console.log('error', error.message);
      this.progress = updateData;

    })
  }

  changePage($event: PageEvent) {
    console.log($event);
    this.pages.limit = $event.pageSize;
    this.pages.current = $event.pageIndex;
    this.pages.start = $event.pageIndex * $event.pageSize;
    this.getServiceData(false);
  }

  /**
   * This function can be used to mark multiple entries
   * @param $event
   * @param service
   */
  checkAll($event: boolean, service?: Services) {
    if (!service) {
      for (const prod of this.services) {
        prod.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event) {
      setTimeout(() => {
        let del = false;
        for (const prod of this.services) {
          if (prod.checked) {
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;
        this.deleteItems = _.map(_.filter(this.services, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.services, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }

  /**
   * This function used to delete single and multiple entry
   * @param service
   */


  async askDelete(service?: Services) {
    const msg = service ? 'You want to delete this service, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!service && this.deleteItems.length === 0) {
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.services, item => item.checked), item => item.id);
    }
    if (confirm) {
      // call delete api
      try {
        const {status} = service ? await this.api.deleteService(service.id.toString()).toPromise() : await this.api.deleteAllServices(this.deleteItems).toPromise();
        if (status === 1 || service) {
          this.util.presentToast(`${service || this.deleteItems.length === 1 ? 'Service is' : 'Services are'} deleted successfully!`, 1, 'Service Delete');
          this.getServiceData(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'Service Delete');
      }
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddNewServiceComponent, {
      width: '600px',
      data: {select: true}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getServiceData();
    });

  }

  viewService(service: Services) {
    const dialogRef = this.dialog.open(AddNewServiceComponent, {
      width: '600px',
      height: '600px',
      data: {service, selected: true}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getServiceData();
    });

  }

}
