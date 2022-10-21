import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-add-new-pricing',
  templateUrl: './add-new-pricing.component.html',
  styleUrls: ['./add-new-pricing.component.scss']
})
export class AddNewPricingComponent implements OnInit {
  addNewPricingForm: FormGroup;
  isEnable = false;

  errors = {
    name: {valid: 'Enter valid name', required: 'Name is required'},
    value: {valid: 'Enter valid value', required: 'Value is required'},
    type: {valid: 'Enter valid type', required: 'type is required'}
  }

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, public dialogRef: MatDialogRef<AddNewPricingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,) {
    this.addNewPricingForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      value: ['', Validators.required],
      enable: [this.isEnable, Validators.required],
    })
  }

  ngOnInit(): void {
    this.viewPricingForm();
  }



  cancel() {
    this.dialogRef.close();
  }

  viewPricingForm(){
    if(this.data.pricing){
      this.addNewPricingForm.patchValue({
        name: this.data.pricing.name,
        type: this.data.pricing.type,
        value: this.data.pricing.value,
        enable: this.data.pricing.enable,
      })
    }
  }

  onSubmit() {
    const body = this.addNewPricingForm.value
    if(this.addNewPricingForm.valid){
      this.api.postPricing(body).subscribe(data => {
        this.dialogRef.close(data);
        console.log('price', data)
        this.util.presentToast('Pricing have been added to your list', 1, 'Success')
      }, error => {
        this.util.presentToast('Error while adding Pricing to your list', 0, 'Failed');
      })
    }
  }

  onUpdate() {
    const body = this.addNewPricingForm.value;
    const id = this.data.pricing.id;
    if(this.addNewPricingForm.valid){
      this.api.updatePricing(body, id).subscribe(data => {
        console.log('updated pricing', data);
        this.dialogRef.close(data);
        this.util.presentToast('Your price list have been updated', 1, 'Success');
      }, error => {
        this.util.presentToast('Error while updating your price list', 0, 'Failed');
      })
    }
  }

  setToggle($event: MatSlideToggleChange) {
    console.log('toggle', $event)
    this.isEnable = $event.checked;
  }
}
