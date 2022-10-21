import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
// import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Services} from "../../models/Services";
import {Products} from "../../models/Products";
import {ActivatedRoute, Router} from "@angular/router";
import {NbDateService} from "@nebular/theme";


@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.scss']
})
export class AddNewOrderComponent implements OnInit {
  newdata: any

  public a: any[] = [];
  public selectProduct: any[] = [];

  formValid = false
  orderId: any
  updateBtn = false;
  submitBtn = true
  // public timeSlot: any[] = [];
  // daysRequired = 6;
  ready = false;
  public progress: boolean | undefined;
  // progressProduct = false ;
  public services: Services[] = [];
  pages = {
    total: 0,
    current: 0,
    limit: 5,
    start: 0
  };

  public products: Products[] = [];
  selectedProduct: any;

  selectValue(event: any) {
    this.a = event.target.value
    console.log('id', event);
    // console.log('all value',this.a)
    this.selectProduct.push(this.a)
    // console.log(this.allProduct)
    // if ( this.a === this.allProduct){
    // this.addproduct =  false;
    // }else {
    //   this.addproduct = true;
    // }

  }


  addNewOrderForm = this.fb.group({
    f_name: ['', [Validators.required]],
    l_name: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
    city: ['', [Validators.required]],
    postcode: ['', [Validators.required]],
    email: ['', [Validators.required]],
    total: ['', [Validators.required]],
    address: ['', [Validators.required]],
    note: ['', [Validators.required]],
    service: ['', [Validators.required]],
    heatedSpaceSize: ['', [Validators.required]],
    product: [''],
    airFiltration: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    deviceRequirement: ['', [Validators.required]],
    contactEmail: ['', [Validators.required]],
    contactDate: ['', [Validators.required]],
    startTime: ['', [Validators.required]],
    endTime: ['', [Validators.required]],
    contactMe: ['', [Validators.required]],
    size: ['', [Validators.required]],
    contactTime: ['', [Validators.required]],
  });

  // @ts-ignore
  // @ts-ignore

  errors = {
    f_name: {valid: 'Fist name is not valid', required: 'First name is required'},
    l_name: {valid: 'Last name is not valid', required: 'Last name is required'},
    phone: {valid: 'Phone number is not valid', required: 'Phone number is required'},
    city: {valid: 'City name is not valid', required: 'City is required'},
    street_building: {valid: 'Building is not valid', required: 'Building is required'},
    postcode: {valid: 'Post code is not valid', required: 'Post code is required'},
    email: {valid: 'Email is not valid', required: 'Email is required'},
    total: {valid: 'Price is not valid', required: 'Price is required'},
    address: {valid: 'Address is is not valid', required: 'Address is required'},
    service: {valid: 'Service is not valid', required: 'Service is required'},
    note: {valid: 'Notes is not valid', required: 'Notes is required'},
    contactEmail: {valid: 'Contact Email is not valid', required: 'Contact Email is required'},
    // contactTime: {valid: 'Contact Phone is not valid', required: 'Contact Phone is required'}

    // contactDate:{ valid: 'Contact Date is not valid', required:'Contact Date is required'},

  }

  min = new Date();
  minimum = new Date();
  private phoneNumber: any;
  private contactNumber: any
  // allSloats: any = [];
// public data: any;
  orderDetails: any = [];

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, private router: Router, private activate: ActivatedRoute, protected dateService: NbDateService<Date>
  ) {
  }


  ngOnInit(): void {
    this.getServiceData();
    this.getProductData();
    // this.getSlots();
    console.log('this is order id', this.activate.snapshot.paramMap.get('id'));
    this.orderId = this.activate.snapshot.paramMap.get('id');
    console.log('order id', this.orderId);
    if (this.orderId) {
      this.viewOrderForm();
    }
    this.min = this.dateService.addDay(this.dateService.today(), 0);
    this.minimum = this.dateService.addDay(this.dateService.today(), 0);

    // this.route.snapshot.queryParamMap.get('id');
    // this.route.queryParams.subscribe(params => {
    //   this.order = params['id'];
    //   console.log('this is order id',this.order)
    // });
  }

  onSubmit() {
    // this.formValid = true;
    console.log('all data', this.addNewOrderForm.value);
    // console.log('product',this.addNewOrderForm)
    const body = this.addNewOrderForm.value;
    body.product = this.selectProduct;
    console.log('all data in body', body);
    // console.log('product',body.product)
    if (this.addNewOrderForm.valid) {
      this.api.postOrder(body).subscribe(data => {
        console.log('Added Brand', data);
        // this.dialogRef.close(data);
        this.util.presentToast('You have successfully added new order to' +
          ' your list', 1, 'Success')
        // this.formValid = false
        this.router.navigate(['/pages/orders']);
      }, error => {
        console.log(error.message);
        this.util.presentToast('Your order have not added ', 0, 'Failed')
      })
    } else {
      this.util.presentToast('form is not valid', 2, 'Not Valid');
    }


    // for validation code=======================


    // if (this.addNewOrderForm.valid) {
    //   this.api.postOrder(body).subscribe(data => {
    //     console.log('Added Brand', data);
    //     // this.dialogRef.close(data);
    //     this.util.presentToast('You have successfully added new order to' +
    //       ' your list', 1, 'Success')
    //   }, error => {
    //     console.log(error.message);
    //     this.util.presentToast('Your order have not added ', 0, 'Failed')
    //   })
    //
    //
    //
    // }


    // if (this.formValid){
    //   this.util.presentToast('form is not valid', 2, 'Not Valid');
    // }else {
    //   this.util.presentToast('You have successfully added new order to' +
    //     ' your list', 1, 'Success')
    // }

    this.addNewOrderForm.reset();
  }


  //
  // cancel() {
  //   this.dialogRef.close();
  // }

  viewOrderForm() {
    this.api.getSingleOrder(this.orderId).subscribe(data => {
        // this.msg.getOrderUpdates(this.orderId);
        this.orderDetails = data;

        console.log('all new order get', data)
        console.log('all new order get', this.orderDetails)
        this.selectProduct = this.orderDetails.product

      console.log('select product',)
        // this.allProduct = this.orderDetails.product
        //  console.log('all product',this.allProduct)
        if (this.orderDetails) {
          this.addNewOrderForm.patchValue({
            f_name: this.orderDetails.f_name,
            l_name: this.orderDetails.l_name,
            phone: this.orderDetails.phone,
            city: this.orderDetails.city,
            // street_building: this.orderDetails.street_building,
            postcode: this.orderDetails.postcode,
            email: this.orderDetails.email,
            total: this.orderDetails.total,
            address: this.orderDetails.address,
            // street:this.orderDetails.street,
            note: this.orderDetails.note,
            product: this.orderDetails.product,
            service: this.orderDetails.service,
            heatedSpaceSize: this.orderDetails.heatedSpaceSize,
            airFiltration: this.orderDetails.airFiltration,
            startDate: this.orderDetails.startDate,
            deviceRequirement: this.orderDetails.deviceRequirement,
            contactEmail: this.orderDetails.contactEmail,
            contactDate: this.orderDetails.contactDate,
            startTime: this.orderDetails.startTime,
            endTime: this.orderDetails.endTime,
            contactMe: this.orderDetails.contactMe,
            size: this.orderDetails.size,
            contactTime: this.orderDetails.contactTime,
          })
          this.updateBtn = true;
          this.submitBtn = false;
        }

      }
    )
  }

  onUpdate() {
    // this.formValid = true
    const body: any = this.addNewOrderForm.value;
    const id = this.orderDetails.id;
    body.product = this.selectProduct;

    if (this.addNewOrderForm.valid) {
      this.api.updateOrder(body, id).subscribe(data => {
        console.log('updated Data', data);
        this.util.presentToast('This Order have been updated', 1, 'Success')
        this.updateBtn = false
        // this.formValid = false
        this.router.navigate(['/pages/orders']);
        // this.dialogRef.close();
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating Order', 0, 'Failed');
      });


    } else {
      this.util.presentToast('form is not valid', 2, 'Not Valid');
    }


    // if (this.formValid){
    //   this.util.presentToast('form is not valid', 2, 'Not Valid');
    //
    // }


    // for validation code================

    // if (this.addNewOrderForm.valid){
    //   this.api.updateOrder(body, id).subscribe(data => {
    //     // this.dialogRef.close(data);
    //     console.log('updated Data', data);
    //     this.util.presentToast('This Order have been updated', 1, 'Success')
    //   }, error => {
    //     console.log(error.message);
    //     this.util.presentToast('error while updating Order', 0, 'Failed');
    //   });
    // }
  }

  getPhone($event: any) {
    console.log($event.target)
    this.phoneNumber = parseInt($event.target.value);
    console.log(this.phoneNumber)
    if (isNaN(this.phoneNumber)) {
      $event.target.value = '';
    }
  }

  // ==================get services=======================
  getServiceData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getServices().subscribe(data => {
      this.progress = updateData;
      console.log('services', data);
      this.services = data;
    }, error => {
      console.log('error', error.message);
    })
  }

  // ==========================get all product===================

  getProductData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getProducts().subscribe(data => {
      this.progress = false;
      console.log('product', data);
      this.products = data;
    }, error => {
      console.log('error', error.message);
    })
  }

// ===================get slots=======================

  // public getSlots() {
  //   this.api.getSlots().subscribe(data => {
  //     console.log('sloats',data);
  //     // this.allSloats = data
  //     // console.log('contact div value is true now', this.dataShare.contactDiv);
  //     const grouped = _.chain(data).groupBy('date').map((value, key) => ({date: key, slots: value})).value();
  //     this.allSloats = grouped;
  //     for (const slot of this.allSloats) {
  //       slot.mDate = moment(slot.date);
  //       slot.date = moment(slot.date).format('dddd') + ' ' + moment(slot.date).format('DD.MM');
  //       for (const mSlot of slot.slots) {
  //         mSlot.label = moment(mSlot.start).format('HH:mm');
  //       }
  //     }
  //     console.log('these are slots', grouped);
  //     this.getNextSlots(moment().startOf('day'), false)
  //   })
  // }
  //
  // getNextSlots(startDate: any, reverse: boolean): void {
  //   const mStart = startDate.clone();
  //   if (reverse) {
  //     mStart.subtract(6, 'days');
  //   }
  //   this.timeSlot = [];
  //   for (let i = 0; i <= this.daysRequired; i++) {
  //     const cur = mStart.clone().add(i, 'days').startOf('day');
  //     this.timeSlot.push({
  //       day: cur.format('dddd') + ' ' + cur.format('DD.MM'),
  //       date: cur,
  //       allSloats: this.isSlotExists(cur),
  //     });
  //   }
  //   this.ready = true;
  // }
  //
  //
  // private isSlotExists(date: any) {
  //   for (const item of this.allSloats) {
  //     if (date.isSame(item.mDate, 'day')) {
  //       return item.slots;
  //     }
  //   }
  //   return [];
  // }

  // OpenSlot() {
  //   const dialogRef = this.dialog.open(PlaceOrderComponent, {
  //     width: '600px',
  //     // data: {coupon, selected: true}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result:`, result);
  //     // this.getAllCoupons(true);
  //   });
  //
  // }
  onCancel() {
    this.router.navigate(['/pages/orders']);
  }


  getContact($event: any) {
    this.contactNumber = parseInt($event.target.value)
    if (isNaN(this.contactNumber)) {
      $event.target.value = '';
    }


  }


  // changeValue($event: Event) {
  //   console.log('selected value of product', $event)
  //
  // }

  // changeValue(value:number) {
  //   console.log('product id',value);
  // }


  productDelete(index: number) {
    this.selectProduct.splice(index, 1)
  }


  addProduct() {
    if (this.selectProduct.length > 0) {
      let found = false
      for (const product of this.selectProduct) {
        if (product.id.toString() === this.selectedProduct) {

          found = true;
          console.log('product already added', product.id.toString())
        }
      }

      if (!found) {
        for (const item of this.products) {
          if (item.id.toString() === this.selectedProduct) {
            this.selectProduct.push(item)
          }
        }
      }
    } else {
      console.log('I am here')
      for (const item of this.products) {
        if (item.id.toString() === this.selectedProduct) {
          this.selectProduct.push(item);
          console.log('this is added', this.selectProduct)
        }
      }
    }
  }

  toStr = JSON.stringify;

  setValue($event: any) {
    this.selectedProduct = JSON.parse($event.target.value);
  }

}






