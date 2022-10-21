import {Component, Inject, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-add-new-service',
  templateUrl: './add-new-service.component.html',
  styleUrls: ['./add-new-service.component.scss']
})
export class AddNewServiceComponent implements OnInit {
  addNewServiceForm = this.fb.group({
    name: ['', [Validators.required]],
    enable: [false, [Validators.required]],
    desc: ['', [Validators.required]],
  })

  errors = {
    name: {
      valid: 'The service name is not valid', required: 'The service name is required'
    }
  }
  public progress: boolean | undefined;
  public services: Services[] = [];
  uploadFile: any;

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, public dialogRef: MatDialogRef<AddNewServiceComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.viewServiceForm();
  }

  onSubmit() {
    const body = this.addNewServiceForm.value;
    body.image = this.uploadFile.file.id;
    if (this.addNewServiceForm.valid) {
      this.api.postService(body).subscribe(data => {
        console.log('Added Brand', data);
        this.dialogRef.close(data);
        this.util.presentToast('You have successfully added new service to' +
          ' your list', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('Your service have not added ', 0, 'Failed')
      })
    }
    this.addNewServiceForm.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  viewServiceForm(){
    if(this.data.service) {
      this.addNewServiceForm.disabled
      this.addNewServiceForm.patchValue({
        name: this.data.service.name,
        desc: this.data.service.desc,
        enable: this.data.service.enable,
      })
    }

  }

  onUpdate(){
    const body: any = this.addNewServiceForm.value;
    if(this.uploadFile){
      body.image = this.uploadFile.file.id;
    }
    const id = this.data.service.id;

    if (this.addNewServiceForm.valid){
      this.api.updateService(body, id).subscribe(data => {
        this.dialogRef.close(data);
        console.log('updated Data', data);
        this.util.presentToast('Service have been updated', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating service', 0, 'Failed');
      });
    }
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
        this.uploadFile = false;
      }
    });
  }

}
