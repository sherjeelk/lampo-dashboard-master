import {Component, Input, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {CustomError} from '../CustomError';

@Component({
  selector: 'app-input-error',
  templateUrl: './input-error.component.html',
  styleUrls: ['./input-error.component.scss']
})
export class InputErrorComponent implements OnInit {


  @Input() form: any;
  @Input() name = '';
  @Input() matchWith = '';
  @Input() length = 0;
  @Input() field = '';
  @Input() msg: CustomError  = {};

  valid = false;
  min = false;
  max = false;
  required = false;

  constructor() { }



  ngOnInit(): void {
  }

}
