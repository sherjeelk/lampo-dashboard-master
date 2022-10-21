import {AppConstants} from '../AppConstants';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest
} from '@angular/common/http';
import {SessionService} from './session.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Brands} from 'src/app/models/Brands';
import {Order} from "../models/Order";
import {Services} from "../models/Services";
import {Cities} from "../models/Cities";
import {Products} from "../models/Products";
import {LoginRes} from "../models/LoginRes";
import {File} from '../models/File';
import {Coupon} from "../models/Coupon";
import {Pricing} from "../models/Pricing";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers: any;

  constructor(private http: HttpClient, private session: SessionService) {
    // if user is logged in it will set headers automatically to headers variable
    // it also observe the changes so it will automatically handle everything
    this.session.auth.subscribe(data => {
      if (data) {
        this.headers = {Authorization: `Bearer ${session.getToken()}`};
      } else {
        this.headers = {};
      }
    });
  }

  public setToken(): void {
    this.headers = {Authorization: `Bearer ${this.session.getToken()}`};
  }

// Login Api
  doLogin(body: any): Observable<LoginRes> {
    return this.http.post<any>(AppConstants.API.LOGIN, body)
  }


//upload image
  uploadImage(body: FormData): Observable<any> {
    return this.http.post(AppConstants.API.UPLOAD_IMAGES, body);
  }

  deleteImages(ids: string[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.IMAGES_DELETE, {ids}, {headers: this.headers});
  }

  getDiskSpace() {
    return this.http.get<any>(AppConstants.API.GET_DISK, {headers: this.headers});
  }

  //upload file
  public uploadFile(formData: FormData): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${this.session.getToken()}`)
    const req = new HttpRequest('POST', AppConstants.API.FILE_UPLOAD, formData, {
      reportProgress: true,
      headers: headers
    });
    return this.http.request(req);
  }

  getAllFiles(page: number = 0, limit: number = 500) {
    return this.http.get<File[]>(AppConstants.API.FILES + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }

  // //Brands Api
  //
  // getBrands(page: number = 0, limit: number = 50): Observable<Brands[]> {
  //   return this.http.get<Brands[]>(AppConstants.API.BRANDS + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  // }
  //
  // postBrand(body: any): Observable<Brands> {
  //   return this.http.post<Brands>(AppConstants.API.BRANDS, body, {headers: this.headers})
  // }
  //
  // updateBrand(body: any, id: any): Observable<any> {
  //   return this.http.put<Brands>(AppConstants.API.BRANDS + '/' + `${id}`, body, {headers: this.headers})
  // }
  //
  // deleteBrand(userId: string): Observable<any> {
  //   return this.http.delete(AppConstants.API.BRANDS + '/' + userId, {headers: this.headers})
  // }
  //
  // deleteAllBrands(ids: string[]): Observable<any> {
  //   return this.http.post<any>(AppConstants.API.DELETE_BRANDS, {ids}, {headers: this.headers})
  // }

  //Order Api

  getOrders(page: number = 0, limit: number = 50): Observable<Order[]> {
    return this.http.get<Order[]>(AppConstants.API.ORDERS + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }


  getSingleOrder(id:string): Observable<Order[]> {
    return this.http.get<Order[]>(AppConstants.API.ORDERS + `/ ${id}`, {headers: this.headers});
  }




  updateOrder(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.ORDERS + '/' + `${id}`, body, {headers: this.headers})
  }

  postOrder(body: any): Observable<Order> {
    return this.http.post<Order>(AppConstants.API.ORDERS, body, {headers: this.headers})
  }

  deleteOrder(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.ORDERS + '/' + userId, {headers: this.headers})
  }

  deleteAllOrders(ids: number[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.DELETE_ORDERS, {ids}, {headers: this.headers})
  }

  //Service Api

  getServices(page: number = 0, limit: number = 50): Observable<Services[]> {
    return this.http.get<Services[]>(AppConstants.API.SERVICES + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }

  updateService(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.SERVICES + '/' + `${id}`, body, {headers: this.headers})
  }

  postService(body: any): Observable<Services> {
    return this.http.post<Services>(AppConstants.API.SERVICES, body, {headers: this.headers})
  }

  deleteService(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.SERVICES + '/' + userId, {headers: this.headers})
  }

  deleteUser(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.USERS + '/' + userId, {headers: this.headers})
  }

  deleteAllServices(ids: number[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.DELETE_SERVICES, {ids}, {headers: this.headers});
  }
  deleteAllUser(ids: number[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.DELETE_USERS, {ids}, {headers: this.headers});
  }

  //Cities Api

  getCities(page: number = 0, limit: number = 50): Observable<Cities[]> {
    return this.http.get<Cities[]>(AppConstants.API.CITIES + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }

  updateCity(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.CITIES + '/' + `${id}`, body, {headers: this.headers});
  }

  postCity(body: any): Observable<Cities> {
    return this.http.post<Cities>(AppConstants.API.CITIES, body, {headers: this.headers})
  }

  deleteCity(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.CITIES + '/' + userId, {headers: this.headers})
  }

  deleteAllCities(ids: number[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.DELETE_CITIES, {ids}, {headers: this.headers})
  }

  // Product Api

  getProducts(page: number = 0, limit: number = 50): Observable<Products[]> {
    return this.http.get<Products[]>(AppConstants.API.PRODUCTS + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }

  updateProduct(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.PRODUCTS + '/' + `${id}`, body, {headers: this.headers});
  }

  postProduct(body: any): Observable<Products> {
    return this.http.post<Products>(AppConstants.API.PRODUCTS, body, {headers: this.headers})
  }

  deleteProduct(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.PRODUCTS + '/' + userId, {headers: this.headers})
  }

  deleteAllProduct(ids: number[]): Observable<any> {
    return this.http.post<any>(AppConstants.API.DELETE_PRODUCTS, {ids}, {headers: this.headers})
  }

  //Coupons
  getCoupons(page: number = 0, limit: number = 50): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(AppConstants.API.COUPONS + `?_limit=${limit}&_start=${page}`, {headers: this.headers});
  }

  deleteCoupons(userId: string): Observable<any> {
    return this.http.delete<any>(AppConstants.API.COUPONS + '/' + userId, {headers: this.headers});
  }

  deleteAllCoupons(ids: string[]) {
    return this.http.post<any>(AppConstants.API.DELETE_COUPONS, {ids}, {headers: this.headers});
  }

  postCoupons(body: any): Observable<Coupon[]> {
    return this.http.post<Coupon[]>(AppConstants.API.COUPONS, body, {headers: this.headers});
  }

  updateCoupon(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.COUPONS + '/' + `${id}`, body, {headers: this.headers});
  }

  // pricing
  getPricing(): Observable<Pricing[]> {
    return this.http.get<Pricing[]>(AppConstants.API.PRICING, {headers: this.headers})
  }

  postPricing(body: any): Observable<any> {
    return this.http.post<any>(AppConstants.API.PRICING, body, {headers: this.headers});
  }

  updatePricing(body: any, id: string): Observable<any> {
    return this.http.put<any>(AppConstants.API.PRICING + '/' + id, body, {headers: this.headers});
  }

  deletePricing(userId: string): Observable<any> {
    return this.http.delete(AppConstants.API.PRICING + '/' + userId, {headers: this.headers})
  }

  deleteAllPricing(ids: any): Observable<any> {
    return this.http.delete(AppConstants.API.PRICING + '/' + ids, {headers: this.headers})
  }

  getUsers(page: number = 0, limit: number = 50): Observable<Pricing[]> {
    return this.http.get<Pricing[]>(AppConstants.API.USERS, {headers: this.headers})
  }


  postUser(body: any): Observable<any> {
    return this.http.post<any>(AppConstants.API.USERS, body, {headers: this.headers})
  }

  updateUser(body: any, id: any): Observable<any> {
    return this.http.put<any>(AppConstants.API.USERS + '/' + `${id}`, body, {headers: this.headers})
  }

  public getSlots(): Observable<any[]> {
    return this.http.get<any[]>(AppConstants.API.SLOTS + AppConstants.COMPANY_KEY);
  }
}


// =====================get sloats=======================



