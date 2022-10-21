import {Component, Input, OnInit} from '@angular/core';
import {UtilService} from "../../services/utils.service";
import {SessionService} from "../../services/session.service";

@Component({
  selector: 'app-name',
  templateUrl: './name.component.html',
  styleUrls: ['./name.component.scss']
})
export class NameComponent implements OnInit {
  letter: any;

  @Input() userName: any;

  constructor(public util: UtilService, public session: SessionService) { }

  ngOnInit(): void {

    this.letter = this.util.getColoredChip(this.userName)
    console.log('sdf',this.letter);

  }


  logOut() {
    this.session.logout();
  }
}
