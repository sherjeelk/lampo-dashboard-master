import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FileSystemDirectoryEntry, FileSystemFileEntry, NgxFileDropEntry} from 'ngx-file-drop';
import * as _ from 'lodash';
import {AnimationOptions} from 'ngx-lottie';
import {HttpEvent, HttpEventType} from '@angular/common/http';
import {ApiService} from '../../services/api.service';
import {map} from 'rxjs/operators';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  displayFiles: any[] = [];
  inProgress = false;
  completed = false;
  options: AnimationOptions = {
    path: '/assets/json/progress-anim.json',
  };
  private uploadSubscription: any;
  constructor(
    private util: UtilService,
    public dialogRef: MatDialogRef<FileUploadComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private api: ApiService) {}

  public files: NgxFileDropEntry[] = [];
  percentage = 0.0;

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      // Is it a file?
      const reg = /(?:\.([^.]+))?$/;
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.displayFiles.push({
            name: fileEntry.name.substr(0, 18) + (fileEntry.name.length > 18 ? '...' : ''),
            // tslint:disable-next-line:no-non-null-assertion
            ext: '.' + reg.exec(fileEntry.name)![1] || '',
            url: URL.createObjectURL(file),
            file,
            path: droppedFile.relativePath
          });


          // Here you can access the real file
          console.log(droppedFile.relativePath, file, URL.createObjectURL(file));

          /*
           // You could upload it like this:
           const formData = new FormData()
           formData.append('logo', file, relativePath)

           // Headers
           const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

           this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
           .subscribe(data => {
            // Sanitized logo returned from backend
          })
           **/

        });

        console.log(this.displayFiles);
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  public fileOver(event: any){
    console.log(event);
  }

  public fileLeave(event: any){
    console.log(event);
  }

  openFileSelector() {

  }

  remove(file: any) {
    this.displayFiles = _.filter(this.displayFiles, item => item.name !== file.name);
  }

  uploadFiles() {
    // show progress
    this.inProgress = true;
    const formData = new FormData();
    this.displayFiles.forEach(item => {
      formData.append('files', item.file);
    });

    this.uploadSubscription = this.api
      .uploadFile(formData)
      .pipe(map((event: HttpEvent<any>) =>
      {
        this.getEventMessage(event);
      }))
      .subscribe(() => {
        console.log('it appears all done!');
      }, (error) => {
        // on error
        console.log('Unable to load!', error);
        this.percentage = 0;
      });
  }

  animationCreated($event: any) {
    console.log('Animation started', $event);
  }

  private getEventMessage(event: HttpEvent<any>) {
    switch (event.type) {
      case HttpEventType.Sent:
        this.percentage = 0;  // upload percentage
        break;

      case HttpEventType.UploadProgress:
        // @ts-ignore
        const percentDone = Math.round(100 * event.loaded / event.total);
        this.percentage = percentDone;
        break;

      case HttpEventType.Response:
        this.percentage = 100; // file is uploaded
        // event.body
        // show notifications/toast in here
        console.log('All Done Complete = true');
        this.util.presentToast('Files are uploaded successfully!', 1, 'File Uploaded');
        this.reset(1);
        return;
    }
  }

  reset(type: number) {
    this.completed = false;
    this.inProgress = false;
    this.percentage = 0;
    this.displayFiles = [];
    this.files = [];
    if (type === 1) {
      this.onNoClick();
    }
  }
}
