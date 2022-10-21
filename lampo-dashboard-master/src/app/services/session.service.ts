import {Injectable} from '@angular/core';
import {ReplaySubject} from 'rxjs';
import {LocalStorageService} from './local-storage.service';
import {Router} from '@angular/router';

@Injectable({
  providedIn: `root`,
})

/**
 * This service is used to keep the things related to Auth,
 * so user info, token and things like that can be kept here
 */
export class SessionService {

  public isLoggedIn = false;
  // public auth = new BehaviorSubject<boolean>(null);
  public auth = new ReplaySubject(1);
  private token = '';
  private user: any;

  constructor(private router: Router, private storage: LocalStorageService) {
    // Get all info from localstorage
    this.init();
  }

  /**
   * To be used to set token.
   * @param token - The token post received post login.
   */
  async setToken(token: string): Promise<void> {
    this.token = token;
    await this.storage.setItem('token', token);
    await this.storage.setBoolean('loggedIn', true);
  }

  /**
   * To be used to set user.
   * @param user - The user object.
   */
  async setUser(user: any): Promise<void> {
    this.user = user;
    this.isLoggedIn = true;
    console.warn('Got this for saving', user);
    await this.storage.setObject('user', user);
    this.auth.next(true);
  }

  /** This function can be used to get token */
  getToken(): string {
    return this.token;
  }

  /** This function can be used to get user */
  getUser(): any {
    // console.log(this.user)
    return this.user;
  }

  /** Logout current user */
  logout(): void {
    this.isLoggedIn = false;
    this.storage.removeItem('user');
    this.storage.removeItem('token');
    this.storage.setBoolean('loggedIn', false);
    this.token = '';
    this.auth.next(false);
    this.router.navigateByUrl('/auth/login');
  }

  /** This function is private and should not be used for anything else than init of session service */
  private init(): void {
    this.isLoggedIn =  this.storage.getBoolean('loggedIn');
    this.user =  this.storage.getObject('user');
    this.token =  this.storage.getItem('token') || '';
    console.log('Auth is ', this.isLoggedIn, this.user);
    this.auth.next(this.isLoggedIn);
    // We can also optionally call refresh token API is available to refresh the token
  }
}
