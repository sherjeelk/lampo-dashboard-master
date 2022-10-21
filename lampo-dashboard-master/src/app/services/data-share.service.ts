import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as _ from "lodash";
import {ApiService} from "./api.service";


@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  slotsSelected: any;

  constructor( public api: ApiService) { }
  getTime(date: any) {
    return moment.utc(date).format('HH:mm')
  }
}
