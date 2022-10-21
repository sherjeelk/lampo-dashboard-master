import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-new-city',
  templateUrl: './add-new-city.component.html',
  styleUrls: ['./add-new-city.component.scss']
})
export class AddNewCityComponent implements OnInit {
  addNewCityForm = this.fb.group({
    name: ['', [Validators.required]],
    country: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    available: [false, [Validators.required]],
    enable: [false, [Validators.required]],
  })

  errors = {
    name: {valid: 'The brand name is not valid', required: 'The brand name is required'},
    country: {valid: 'Please enter valid country name', required: 'This field is required'},
    postcode: {valid: 'Please enter valid postcode', required: 'This field is required'}

  }

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, public dialogRef: MatDialogRef<AddNewCityComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.viewCityForm()
  }


  onSubmit() {
    const body = this.addNewCityForm.value;
    if (this.addNewCityForm.valid) {
      this.api.postCity(body).subscribe(data => {
        console.log('Added City', data);
        this.dialogRef.close(data);
        this.util.presentToast('You have successfully added new city to' +
          ' your list', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('Your city have not added ', 0, 'Failed')
      })
    }
    this.addNewCityForm.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  viewCityForm(){
    if(this.data.city) {
      this.addNewCityForm.disabled
      this.addNewCityForm.patchValue({
        name: this.data.city.name,
        country: this.data.city.country,
        postcode: this.data.city.postcode,
        available: this.data.city.available,
        enable: this.data.city.enable,
      })
    }

  }

  onUpdate(){
    const body: any = this.addNewCityForm.value;
    const id = this.data.city.id;

    if (this.addNewCityForm.valid){
      this.api.updateCity(body, id).subscribe(data => {
        this.dialogRef.close(data);
        console.log('updated Data', data);
        this.util.presentToast('This brand have been updated', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating brand', 0, 'Failed');
      });
    }
  }

}
