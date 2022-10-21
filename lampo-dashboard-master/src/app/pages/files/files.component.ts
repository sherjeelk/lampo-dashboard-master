import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';
import {File} from '../../models/File';
import {AppConstants} from '../../AppConstants';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {FileUploadComponent} from '../file-upload/file-upload.component';
import * as _ from 'lodash';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.scss']
})
export class FilesComponent implements OnInit {

  files: File[] = [];
  BASE_URL =  AppConstants.BASE_URL;
  showDelete = false;
  usedSpace = '0 KB';
  usedPercent = 0;
  remaining = 0;
  total = 50;

  constructor(private api: ApiService, public util: UtilService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllFiles();
    this.getDiskSpace();
  }

  getAllFiles(){
    this.api.getAllFiles().subscribe(data => this.files = data, error => {

      this.util.presentToast('Unable to get files!', 0, 'Error');
    });
  }

  getDiskSpace(){
    this.api.getDiskSpace().subscribe(data => {
      console.log(data);
      let size = data.size;
      this.usedSpace = size + ' KB';
      if (size > 1024){
        size = Math.round((size / 1024));
        this.usedSpace = size + ' MB';
        this.remaining = this.total - (size / 1024);
        this.usedPercent = 100 - ((this.remaining / this.total) * 100);
      }
      if (size > 1024){
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
      if (item.checked){
        this.showDelete = true;
        return;
      }
    });
  }

  delete() {
    const selected = _.filter(this.files, item => item.checked);
    const ids = _.map(selected, item => item.id);
    this.api.deleteImages(ids).subscribe(data => {
      if (data.status === 1){
        this.util.presentToast('Files removed successfully!', 1, 'Files Removed');
        this.getAllFiles();
      }
    }, error => {
      console.log(error);
      this.util.presentToast('An error occurred while removing files!', 0, 'Files Removed');
    });

  }

}
