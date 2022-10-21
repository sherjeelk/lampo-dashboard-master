import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {ApiService} from '../../services/api.service';
import {SessionService} from '../../services/session.service';
import {Router} from '@angular/router';
import {UtilService} from "../../services/utils.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]]
  });

  errors = {
    email: {
      valid: 'Please enter a valid email',
      required: 'Please enter an email'
    },
    password: {
      valid: 'Please enter a valid password',
      required: 'Please enter a password'
    },
  };

  constructor(private fb: FormBuilder, private api: ApiService, public session: SessionService, public util: UtilService, private route: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): any {
    if (this.loginForm.valid) {
      const body = this.loginForm.value;
      body.identifier = body.email;
      delete body.email;
      console.log('this is body', body)
      this.api.doLogin(body).subscribe(async data => {
        console.log(data)
        if (data.user.role.type === 'admin') {
          await this.session.setToken(data.jwt);
          await this.session.setUser(data.user)
          await this.api.setToken();
          await this.route.navigate(['/pages']);
        }else{
          this.util.presentToast('You have no access to this site', 0, 'No' +
            ' access')
        }

      },error => {
        this.util.presentToast('Unable to login, please check id and password!', 0, 'Login Error');
      })
    }
  }
}
