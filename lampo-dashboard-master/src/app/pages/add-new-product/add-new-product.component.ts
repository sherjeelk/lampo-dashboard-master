import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {UtilService} from "../../services/utils.service";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef
} from "@angular/material/dialog";
import {Services} from "../../models/Services";
import {SelectFileComponent} from "../select-file/select-file.component";
import {FileHandle} from "../../models/FileHandle";
import {Brands} from "../../models/Brands";

@Component({
  selector: 'app-add-new-product',
  templateUrl: './add-new-product.component.html',
  styleUrls: ['./add-new-product.component.scss'],
})
export class AddNewProductComponent implements OnInit {
  addNewProductForm = this.fb.group({
    enable: [false, [Validators.required]],
    name: ['', [Validators.required]],
    desc: ['', [Validators.required]],
    price: ['', [Validators.required]],

  })


  errors = {
    brand: {valid: 'Brand is not valid', required: 'Brand is required'},
    name: {valid: 'Name is not valid', required: 'Name is required'},
    service: {valid: 'Service is not valid', required: 'Service is required'},
    price: {valid: 'Price is not valid', required: 'Price is required'}
  }
  public progress: boolean | undefined;
  public services: Services[] = [];
  uploadFile: {
    selected: boolean;
    file: any;
  }  = {
    selected : false,
    file: {}
  };
  files: FileHandle[] = [];
  selectedService: any;
  brands: Brands[] = [];

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, public dialogRef: MatDialogRef<AddNewProductComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog, private change: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.viewProductForm();
    this.getServiceData();
  }

  onSubmit() {
    console.log('selected', this.selectedService);
    const body = this.addNewProductForm.value;
    if (this.uploadFile) {
      body.image = this.uploadFile.file.id;
    }

    if (this.addNewProductForm.valid) {
      this.api.postProduct(body).subscribe(data => {
        console.log('Added Brand', data);
        this.dialogRef.close(data);
        this.util.presentToast('You have successfully added new product to your list', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('Your product have not added ', 0, 'Failed')
      })
    }
    this.addNewProductForm.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  viewProductForm() {
    if (this.data.product) {
      this.addNewProductForm.patchValue({
        enable: this.data.product.enable,
        name: this.data.product.name,
        desc: this.data.product.desc,
        price: this.data.product.price,
      });
    }
    // this.selectedService = this.data.product.service;
    this.change.detectChanges();
    console.log('data', this.data)
  }

  onUpdate() {
    const body: any = this.addNewProductForm.value;
    if (this.uploadFile) {
      body.image = this.uploadFile.file.id;
    }

    body.service = this.addNewProductForm.get('service')?.value;
    const id = this.data.product.id;

    console.log('Body', body)

    if (this.addNewProductForm.valid) {
      this.api.updateProduct(body, id).subscribe(data => {
        this.dialogRef.close(data);
        console.log('updated Data', data);
        this.util.presentToast('This Product have been updated', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating product', 0, 'Failed');
      });
    }
  }

  getServiceData(updateData: boolean = false) {
    this.progress = !updateData;
    this.api.getServices().subscribe(data => {
      this.progress = updateData;
      console.log('servicessss', data);
      this.services = data;
    }, error => {
      console.log('error', error.message);
    })
  }

  openPopUp() {
    const dialogData = this.dialog.open(SelectFileComponent, {
      maxWidth: '85vw',
      width: '1350px',
      height: '780px',
      data: {type: 'image', select: true}
    });
    dialogData.afterClosed().subscribe(result => {
      console.log(`Dialog result`, result);
      if (result.selected === true) {
        this.uploadFile = result;
      } else {
        this.uploadFile.selected = false;
      }
    });
  }



}
