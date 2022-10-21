import {Component, Inject, OnInit} from '@angular/core';
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {FormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NbDateService} from "@nebular/theme";

@Component({
  selector: 'app-add-new-coupons',
  templateUrl: './add-new-coupons.component.html',
  styleUrls: ['./add-new-coupons.component.scss']
})
export class AddNewCouponsComponent implements OnInit {
  addCouponForm = this.fb.group({
    coupon: ['', [Validators.required]],
    discount: ['', [Validators.required]],
    type: ['', [Validators.required]],
    expiry: ['', [Validators.required]],
  });

  errors = {
    coupon: {valid: 'Please enter a valid name', required: 'Please enter name'},
    discount: {valid: 'Please enter a valid discount', required: 'Please enter a discount'},
    expiry: {valid: 'Please enter a valid date', required: 'Please enter coupon date'},
    type: {valid: 'Please select valid option', required: 'Please select discount type'}
  };
  min = new Date();

  selectedItem: any;

  constructor(private api: ApiService, public util: UtilService,
              private fb: FormBuilder, public dialogRef: MatDialogRef<AddNewCouponsComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any ,protected dateService: NbDateService<Date>) {}

  ngOnInit(): void {
    this.min = this.dateService.addDay(this.dateService.today(), 0);

    console.log('data', this.data);
    console.log('khgcvhg',this.viewCouponForm())
    this.viewCouponForm();
  }


  onSubmit(): any {
    const body: any = this.addCouponForm.value;
    if (this.addCouponForm.valid) {
      this.api.postCoupons(body).subscribe((data: any) => {
        this.dialogRef.close(data);
        // console.log('post coupon', data);
        this.util.presentToast('Your coupon have created successfully', 1 , 'Success')
      }, (error: { message: string; }) => {
        console.log(error.message);
        this.util.presentToast('Error while creating your coupon', 0, 'Failed');
      });
    }
    this.addCouponForm.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  viewCouponForm(): any{
    if(this.data.coupon) {
      this.addCouponForm.patchValue({
        coupon: this.data.coupon.coupon,
        discount: this.data.coupon.discount,
        expiry: this.data.coupon.expiry,
        type: this.data.coupon.type,
      })
    }
  }

  onUpdate(){
    const body: any = this.addCouponForm.value;
    const id = this.data.coupon.id;

    if (this.addCouponForm.valid){
      this.api.updateCoupon(body, id).subscribe(data => {
        this.dialogRef.close(data);
        console.log('updated Data', data);
        this.util.presentToast('This coupon have been updated', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating coupon', 0, 'Failed');
      });
    }
  }


}
