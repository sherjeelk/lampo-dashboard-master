import {Component, Inject, OnInit} from '@angular/core';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import * as _ from 'lodash';
import {File} from '../../models/File';
import {AppConstants} from '../../AppConstants';
import {ApiService} from '../../services/api.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from '@angular/material/dialog';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-select-file',
  templateUrl: './select-file.component.html',
  styleUrls: ['./select-file.component.scss']
})
export class SelectFileComponent implements OnInit {
  files: File[] = [];
  BASE_URL = AppConstants.BASE_URL;
  showDelete = false;
  usedSpace = '0 KB';
  usedPercent = 0;
  remaining = 0;
  total = 50;
  progress: any;

  constructor(private api: ApiService, public util: UtilService, public dialog: MatDialog, public dialogRef: MatDialogRef<SelectFileComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.getAllFiles();
    this.getDiskSpace();
  }

  getAllFiles() {
    this.progress = true
    this.api.getAllFiles().subscribe(data => {
        this.files = data
        this.progress = false;
      },
      error => {
        this.util.presentToast('Unable to get files!', 0, 'Error');
      });
  }

  getDiskSpace() {
    this.api.getDiskSpace().subscribe(data => {
      console.log(data);
      let size = data.size;
      this.usedSpace = size + ' KB';
      if (size > 1024) {
        size = Math.round((size / 1024));
        this.usedSpace = size + ' MB';
        this.remaining = this.total - (size / 1024);
        this.usedPercent = 100 - ((this.remaining / this.total) * 100);
      }
      if (size > 1024) {
        size = Math.round((size / 1024));
        this.usedSpace = size + ' GB';
        this.usedPercent = 100 - ((size / this.total) * 100);
        this.remaining = this.total - size;
      }
    });
  }

  openUploadDialog(): void {
    const dialogRef = this.dialog.open(FileUploadComponent, {
      panelClass: 'full-dialog-container',
      width: '70%',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getAllFiles();
    });
  }

  checkboxChanged() {
    this.showDelete = false;
    this.files.forEach(item => {
      console.log(item.checked);
      if (item.checked) {
        this.showDelete = true;
        return;
      }
    });
  }

  delete() {
    const selected = _.filter(this.files, item => item.checked);
    const ids = _.map(selected, item => item.id);
    this.api.deleteImages(ids).subscribe(data => {
      if (data.status === 1) {
        this.util.presentToast('Files removed successfully!', 1, 'Files Removed');
        this.getAllFiles();
      }
    }, error => {
      console.log(error);
      this.util.presentToast('An error occurred while removing files!', 0, 'Files Removed');
    });

  }

  close() {
    this.dialogRef.close({selected: false});
  }


  getId(file: any) {
    if (this.data.select) {
      this.dialogRef.close({file, selected: true});
    }
  }

}
