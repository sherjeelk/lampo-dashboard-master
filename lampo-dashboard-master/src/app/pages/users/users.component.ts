import { Component, OnInit } from '@angular/core';
import { Services } from "../../models/Services";
import { ApiService } from "../../services/api.service";
import { UtilService } from "../../services/utils.service";
import { MatDialog } from "@angular/material/dialog";
import { PageEvent } from "@angular/material/paginator";
import * as _ from "lodash";
import { AddNewServiceComponent } from "../add-new-service/add-new-service.component";
import { AddNewUsersComponent } from "../add-new-users/add-new-users.component";
import { User } from "../../models/User";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: [ './users.component.scss' ]
})
export class UsersComponent implements OnInit {
  public users: any = [];

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
    this.getUsersData();
  }

  getUsersData(updateData: boolean = false) {
    console.log('user deleted');

    this.progress = !updateData;
    this.api.getUsers(this.pages.start, this.pages.limit).subscribe(data => {
      console.log('users', data);
      this.users = data;
      this.progress = false;

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
    this.getUsersData(false);
  }

  /**
   * This function can be used to mark multiple entries
   * @param $event
   * @param service
   */
  checkAll($event: boolean, service?: Services) {
    if (!service) {
      for (const prod of this.users) {
        prod.checked = $event;
      }
    } else {
      this.allItems = false;
    }

    // There is a intentional timeout added to because this library seems to be taking time to update checkboxes
    if (!$event) {
      setTimeout(() => {
        let del = false;
        for (const prod of this.users) {
          if (prod.checked) {
            del = true;
            break;
          }
        }
        this.deleteMultiple = del;

        this.deleteItems = _.map(_.filter(this.users, item => item.checked), item => item.id);
      }, 30);
    } else {
      setTimeout(() => {
        this.deleteItems = _.map(_.filter(this.users, item => item.checked), item => item.id);
        this.deleteMultiple = true;
      }, 30);
    }

  }

  /**
   * This function used to delete single and multiple entry
   * @param user
   */


  async askDelete(user?: User) {
    const msg = user ? 'You want to delete this user, this cannot be' +
      ' undone.' : `Do you want to delete these ${this.deleteItems.length} entries, this cannot be undone!`;
    const confirm = await this.util.confirmDialogue(msg);
    if (!user && this.deleteItems.length === 0) {
      // It appears check all function was not called so get all selected items
      this.deleteItems = _.map(_.filter(this.users, item => item.checked), item => item.id);
    }
    if (confirm) {
      // call delete api
      try {
        const { status } = user ? await this.api.deleteUser(user.id.toString()).toPromise() : await this.api.deleteAllUser(this.deleteItems).toPromise();
        if (status === 1 || user) {
          this.util.presentToast(`${user || this.deleteItems.length === 1 ? 'User is' : 'Users are'} deleted successfully!`, 1, 'User Delete');
          this.getUsersData(true);
        }
      } catch (e) {
        console.log(e);
        this.util.presentToast('An error occurred while deleting user!', 0, 'Service Delete');
      }
    }
  }


  openDialog() {
    const dialogRef = this.dialog.open(AddNewUsersComponent, {
      width: '600px',
      data: { select: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getUsersData();
    });

  }

  viewUser(user: any) {
    const dialogRef = this.dialog.open(AddNewUsersComponent, {
      width: '600px',
      height: '600px',
      data: { user, selected: true }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result:`, result);
      this.getUsersData();
    });

  }

}
