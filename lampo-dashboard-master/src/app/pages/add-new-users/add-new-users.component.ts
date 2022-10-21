import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { Services } from "../../models/Services";
import { ApiService } from "../../services/api.service";
import { UtilService } from "../../services/utils.service";
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from "@angular/material/dialog";
import { SelectFileComponent } from "../select-file/select-file.component";
import { nodeDebugInfo } from "@angular/compiler-cli/src/ngtsc/util/src/typescript";

@Component({
  selector: 'app-add-new-users',
  templateUrl: './add-new-users.component.html',
  styleUrls: [ './add-new-users.component.scss' ]
})
export class AddNewUsersComponent implements OnInit {
  // @ViewChild('emailField', { static: false }) emailField: HTMLInputElement | any;
  addNewUserForm = this.fb.group({
    username: [ '', [ Validators.required ]],
    email: [ '', [ Validators.required ,Validators.email] ],
    confirmed: [ false, [ Validators.required ] ],
    blocked: [ false, [ Validators.required ] ],
    password: [ '', [ Validators.required ]],
  })

  errors = {
    username: {
      valid: 'The user name is not valid', required: 'The user name is required'
    },
    email:{valid: 'Email is not valid', required: 'Email is required'},
    password:{valid:'Password is not valid',required:'Password is required'},

  }
  public progress: boolean | undefined;
  public services: Services[] = [];
  uploadFile: any;

  constructor(private fb: FormBuilder, private api: ApiService, public util: UtilService, public dialogRef: MatDialogRef<AddNewUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.viewServiceForm();
  }

  onSubmit() {
    const body = this.addNewUserForm.value;

    console.log('user body', body);

    if (this.addNewUserForm.valid) {
      body.role = 3
      this.api.postUser(body).subscribe(data => {
        console.log('Added Brand', data);
        this.dialogRef.close(data);
        this.util.presentToast('You have successfully added new user to' +
          ' your list', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('Your user have not added ', 0, 'Failed')
      })
    }
    this.addNewUserForm.reset();
  }

  cancel() {
    this.dialogRef.close();
  }

  viewServiceForm() {
    if (this.data.user) {

      this.addNewUserForm.patchValue({
        username: this.data.user.username,
        email: this.data.user.email,
        confirmed: this.data.user.confirmed,
        blocked: this.data.user.blocked,
        password: this.data.user.password,
      })
    }

  }

  onUpdate() {
    let body: any = this.addNewUserForm.value;
    const id = this.data.user.id;
    body.role = 3
    console.log('body', body);
    if (this.addNewUserForm.value.password) {
      if (this.addNewUserForm.value.password.length < 8) {
        delete body.password;
      }
    }

    if (this.addNewUserForm.valid) {
      this.api.updateUser(body, id).subscribe(data => {
        this.dialogRef.close(data);
        console.log('updated Data', data);
        this.util.presentToast('User have been updated', 1, 'Success')
      }, error => {
        console.log(error.message);
        this.util.presentToast('error while updating user', 0, 'Failed');
      });
    }
  }

}
