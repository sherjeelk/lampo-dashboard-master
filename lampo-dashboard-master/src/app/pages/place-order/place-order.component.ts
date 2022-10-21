import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {TooltipPosition} from "@angular/material/tooltip";
import {ApiService} from "../../services/api.service";
import * as _ from 'lodash'
import * as moment from 'moment';
import {DataShareService} from "../../services/data-share.service";

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.scss']
})
export class PlaceOrderComponent implements OnInit {
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[0]);

  public timeSlot: any[] = [];
  private slots: any = [];
  currentDate: any = moment();
  daysRequired = 6;
  ready = false;

  constructor(private apiService: ApiService, public dataShare: DataShareService) { }

  ngOnInit(): void {
    this.getSlots();
  }


  public getSlots() {
    this.apiService.getSlots().subscribe(data => {
      // console.log('contact div value is true now', this.dataShare.contactDiv);
      const grouped = _.chain(data).groupBy('date').map((value, key) => ({date: key, slots: value})).value();
      this.slots = grouped;
      for (const slot of this.slots) {
        slot.mDate = moment(slot.date);
        slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('DD.MM');
        for (const mSlot of slot.slots) {
          mSlot.label = moment(mSlot.start).format('HH:mm');
        }
      }
      console.log('these are slots', grouped);
      this.getNextSlots(moment().startOf('day'), false)
    })
  }




  getNextSlots(startDate: any, reverse: boolean): void {
    const mStart = startDate.clone();
    if (reverse) {
      mStart.subtract(6, 'days');
    }
    this.timeSlot = [];
    for (let i = 0; i <= this.daysRequired; i++) {
      const cur = mStart.clone().add(i, 'days').startOf('day');
      this.timeSlot.push({
        day: cur.format('dddd') + ' ' + cur.format('DD.MM'),
        date: cur,
        slots: this.isSlotExists(cur),
      });
    }
    this.ready = true;
  }
  private isSlotExists(date: any) {
    for (const item of this.slots) {
      if (date.isSame(item.mDate, 'day')) {
        return item.slots;
      }
    }
    return [];
  }

  getSlotValue(item: any) {
    console.log('slot value', item);
    this.dataShare.slotsSelected = item;
    // this.dataShare.contactMe = false;
    // console.log('contact Me value is false now', this.dataShare.contactMe);
    console.log('slot seletected date', this.dataShare.slotsSelected.date);
    console.log('slot value is selected', moment(this.dataShare.slotsSelected.start).format('hh:mm'));
    console.log('slot value is selected', moment(this.dataShare.slotsSelected.end).format('hh:mm'));
  }


}
