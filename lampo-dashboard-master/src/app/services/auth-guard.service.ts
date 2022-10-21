import { SessionService } from './session.service';
import {UtilService} from './utils.service';
import {map, take} from 'rxjs/operators';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private session: SessionService, private util: UtilService, public router: Router) { }
  canActivate(route: ActivatedRouteSnapshot): any {
    return this.session.auth.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        console.log('Called to check access', isAuth, user);
        if (isAuth) {
          console.log('Returning true now!');
          return true;
        } else {
          // this.util.presentSnackBar('Please login to continue!');
          return this.router.createUrlTree(['/auth/login']);
        }}));
  }
}
