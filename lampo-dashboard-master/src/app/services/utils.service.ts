import {Injectable} from '@angular/core';
import  * as _ from 'lodash';
import * as moment from 'moment';
import {AppConstants} from '../AppConstants';
import {BehaviorSubject} from 'rxjs';
import Swal from 'sweetalert2';
import {NbToastrService} from '@nebular/theme';

@Injectable({
  providedIn: 'root',
})
export class UtilService {

  public BASE_URL = AppConstants.BASE_URL;
  public sideNav = new BehaviorSubject<boolean>(true);

  /*
    constructor(private clipboardService: ClipboardService, private snackBar: MatSnackBar, public dialog: MatDialog) { }
  */
  constructor(private toastr: NbToastrService) {
  }

  public groupBy(dataToGroupOn: any, fieldNameToGroupOn: string, fieldNameForGroupName: string, fieldNameForChildren: string): any {
    return _.chain(dataToGroupOn)
      .groupBy(fieldNameToGroupOn)
      .toPairs()
      .map((currentItem: any) => {
        return _.zipObject([fieldNameForGroupName, fieldNameForChildren], currentItem);
      }).value();
  }

  // /**
  //  * This can show alert anywhere in the application
  //  * @param title Title of the message
  //  * @param content content of the message
  //  * @param negative Text of negative button (e.g Cancel)
  //  * @param positive text of positive button (e.g OK)
  //  * @private
  //  */
  // public presentAlert(title, content, negative = 'Cancel', positive = 'Ok'): Promise<any>{
  //   return new Promise<any>((resolve, reject) => {
  //     const dialogRef = this.dialog.open(MessageComponent, {data: {title, content, negative, positive}});
  //     dialogRef.afterClosed().subscribe(result => {
  //       console.log(`Dialog result: ${result}`);
  //       resolve(result);
  //     }, error => {
  //       reject(error);
  //       console.log('An error occurred in opening dialogue');
  //     });
  //   });
  // }
  //
  // async copyToClipBoard(text: string, msg: string = 'Text copied to clipboard successfully!'): Promise<void> {
  //   this.clipboardService.copy(text);
  //   await this.presentSnackBar(msg);
  // }

  public b64toBlob(b64Data: any, contentType = '', sliceSize = 512): Blob {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
  }

  public confirmDialogue(text: string, title?: string) {
    return new Promise<any>((resolve, reject) => {
      Swal.fire({
        title: 'Are you sure?',
        text,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#009ef7',
        cancelButtonColor: '#f1416c',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  /**
   * Display a toast
   * @param msg Message to be displayed
   * @param title Title of the toast
   * @param type Type of toast success=1 or fail=0, warning = 2
   */
  public presentToast(msg: string, type = 1, title?: string): void {
    if (type === 0){
      this.toastr.danger(msg, title);
    } else if (type === 1) {
      this.toastr.success(msg, title);
    } else if (type === 2) {
      this.toastr.warning(msg, title);
    } else {
      this.toastr.show(msg, title);
    }
  }

  public titleCase(text: string): string {
    return text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  }

  public getIndianDate(date: any): string {
    return moment(date).format('DD-MMM-YYYY');
  }

  public getFiDateTime(date: any): string {
    let time = moment(date).format('DD-MMM-YYYY');
    time = time + ' at ' + moment(date).format('HH:mm');
    return time;
  }

  public getTime(date: any): string {
    return moment(date).format('HH:mm');
  }

  public getColoredChip(letter: string): any {
    letter = letter ? letter.charAt(0).toUpperCase() : '0';
    if (letter === 'A' || letter === 'C') {
      return {letter, primary: '#181c32', secondary: '#d1d3e0'};
    } else if (letter === 'B' || letter === 'D') {
      return {letter, primary: '#f64e60', secondary: '#ffe2e5'};
    } else if (letter === 'E' || letter === 'G') {
      return {letter, primary: '#ffa800', secondary: '#fff4de'};
    } else if (letter === 'F' || letter === 'H') {
      return {letter, primary: '#3699ff', secondary: '#e1f0ff'};
    } else if (letter === 'I' || letter === 'K') {
      return {letter, primary: '#85603f', secondary: '#d8ac9c'};
    } else if (letter === 'J' || letter === 'L') {
      return {letter, primary: '#1bc5bd', secondary: '#c9f7f5'};
    } else if (letter === 'M' || letter === 'O') {
      return {letter, primary: '#fed049', secondary: '#fdf1d6'};
    } else if (letter === 'N' || letter === 'P') {
      return {letter, primary: '#7eca9c', secondary: '#ccffbd'};
    } else if (letter === 'Q' || letter === 'S') {
      return {letter, primary: '#8950fc', secondary: '#eee5ff'};
    } else if (letter === 'R' || letter === 'T') {
      return {letter, primary: '#536162', secondary: '#f3f4ed'};
    } else if (letter === 'U' || letter === 'W') {
      return {letter, primary: '#1597bb', secondary: '#8fd6e1'};
    } else if (letter === 'V' || letter === 'X') {
      return {letter, primary: '#93329e', secondary: '#f8a1d1'};
    } else if (letter === 'Y' || letter === 'Z') {
      return {letter, primary: '#30e3ca', secondary: '#e4f9f5'};
    } else {
      return {letter, primary: '#3d84a8', secondary: '#bad7df'};
    }
  }


  public getStatus(status: string): any {
    status = status.toUpperCase();
    if (status === 'CANCELLED' || status === 'CANCELLED_BY_CUSTOMER' || status === 'FAILED') {
      return {status, primary: '#f64e60', secondary: '#ffe2e5'};
    } else if (status === 'PENDING') {
      return {status, primary: '#ffa800', secondary: '#fff4de'};
    } else if (status === 'IN_PROGRESS') {
      return {status, primary: '#3699ff', secondary: '#e1f0ff'};
    }else if (status === 'READY') {
      return {status, primary: '#1bc5bd', secondary: '#c9f7f5'};
    }else if (status === 'SERVED') {
      return {status, primary: '#536162', secondary: '#f3f4ed'};
    }else if (status === 'PAID') {
      return {status, primary: '#3699ff', secondary: '#e1f0ff'};
    } else if (status === 'APPROVED') {
      return {status, primary: '#1bc5bd', secondary: '#c9f7f5'};
    } else if (status === 'REJECTED') {
      return {status, primary: '#93329e', secondary: '#f8a1d1'};
    } else if (status === 'COMPLETED') {
      return {status, primary: '#1fab89', secondary: '#9df3c4'};
    } else {
      return {status, primary: '#3d84a8', secondary: '#bad7df'};
    }
  }

  /**
   * Get date in this format :: 24th May 2018, 02:54 PM
   * @param date Date with time
   */
  public getHumanDateTime(date: any): string {
    return moment(date).format('MMMM Do YYYY, h:mm a');
  }

  /**
   * @deprecated
   * This function can be used to restrict an input field of text type to accept only number
   * to be used like this onkeypress="return isNumberKey(event)"
   * @param evt Event of key press
   */
  public isNumberKey(evt: any): boolean {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    return !(charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57));
  }


  /**
   * To avoid entering letters
   * @param event Event from input on onKeyPress
   */
  stripText(event: any) {
    const separator = '^([0-9])';
    const maskSeparator = new RegExp(separator, 'g');
    return maskSeparator.test(event.key);
  }

  /**
   * This function is used to limit the length of the string
   * @param text
   * @param limit
   */

  truncateString(text: string, limit: number) {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }

}
