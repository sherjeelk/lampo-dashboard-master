import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {NbSidebarComponent} from '@nebular/theme';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-one-column',
  templateUrl: './one-column.component.html',
  styleUrls: ['./one-column.component.scss']
})
export class OneColumnComponent implements OnInit, AfterViewInit {

  @ViewChild('sideBar', {static: false}) sideNav: NbSidebarComponent | undefined;

  constructor(private util: UtilService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.sideNav?.expand();
    }, 50);
    this.sideNav?.stateChange.subscribe(data => {
      console.log('state', data);
      this.util.sideNav.next(data === 'expanded');
    });
  }

}
