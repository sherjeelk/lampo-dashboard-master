export class AppConstants{
  public  static SCHEDULER_BASE_URL = 'https://api.litcode.io';
  public  static COMPANY_KEY = 'lampo';
  constructor(){

  }
  public static BASE_URL = 'https://api.lampoykkonen.fi';
  public static API = {
    LOGIN: AppConstants.BASE_URL + '/auth/local',
    UPLOAD_IMAGES: AppConstants.BASE_URL + '/upload',
    IMAGES_DELETE: AppConstants.BASE_URL + '/images/delete',
    GET_DISK: AppConstants.BASE_URL + '/disk',
    FILE_UPLOAD: AppConstants.BASE_URL + '/upload',
    FILES: AppConstants.BASE_URL + '/upload/files',
    BRANDS: AppConstants.BASE_URL + '/brands',
    CITIES: AppConstants.BASE_URL + '/cities',
    COUPONS: AppConstants.BASE_URL + '/coupons',
    ORDERS: AppConstants.BASE_URL + '/orders',
    PRODUCTS: AppConstants.BASE_URL + '/products',
    SERVICES: AppConstants.BASE_URL + '/services',
    DELETE_BRANDS: AppConstants.BASE_URL + '/brands/all',
    DELETE_CITIES: AppConstants.BASE_URL + '/cities/all',
    DELETE_ORDERS: AppConstants.BASE_URL + '/orders/all',
    DELETE_PRODUCTS: AppConstants.BASE_URL + '/products/all',
    DELETE_SERVICES: AppConstants.BASE_URL + '/services/all',
    DELETE_COUPONS: AppConstants.BASE_URL + '/coupons/delete',
    PRICING:  AppConstants.BASE_URL + '/pricings',
    USERS:  AppConstants.BASE_URL + '/users',
    DELETE_USERS: AppConstants.BASE_URL + '/user/all',
    SLOTS: AppConstants.SCHEDULER_BASE_URL + '/slots/all/',

  }
}
