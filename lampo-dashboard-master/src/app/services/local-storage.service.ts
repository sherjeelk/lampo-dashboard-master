import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * LocalStorage service to be used as a helper in angular projects
 */
export class LocalStorageService {

  constructor() { }

  /**
   * Set boolean in localstorage
   * @param key Key of the item
   * @param value Value of the boolean
   */
  setBoolean(key: string, value: any): void {
    localStorage.setItem(key, value.toString());
  }

  /**
   * Get boolean from local storage
   * @param key Key of the stored item
   */
  getBoolean(key: string): boolean {
    return localStorage.getItem(key) === 'true';
  }

  /**
   * Set string item in local storage
   * @param key key of item
   * @param value value of item in local storage
   */
  setItem(key: string, value: string): void {
    return localStorage.setItem(key, value);
  }

  /**
   * Get string item from local storage
   * @param key Key of item
   */
  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  /**
   * To set the js object in localstorage
   * @param key key of the object
   * @param obj Value of the object
   */
  setObject(key: string, obj: any): void {
    const value = JSON.stringify(obj);
    localStorage.setItem(key, value);
  }

  /**
   * Get object from local storage
   * @param key Key of the object
   */
  getObject(key: string): any {
    const value: any = localStorage.getItem(key);
    try {
      return value ? JSON.parse(value) : null;
    } catch (e) {
      console.log('Invalid json!', value);
      return null;
    }
  }

  /**
   * Set a number in local storage
   * @param key Key of the number needs to be stored
   * @param value Value of the number
   */
  setNumber(key: string, value: number): void {
    if (isNaN(value)){
      console.log('Not a number!');
      return;
    }
    localStorage.setItem(key, value.toString());
  }

  /**
   * Get a number from local storage
   * @param key Key of the number
   */
  getNumber(key: string): number {
    const value = localStorage.getItem(key) || 0;
    return isNaN(+value) ? 0 : +value;
  }


  /**
   * Remove item from localstorage
   * @param  key of the item to be removed
   */
  removeItem(key: string): void{
    localStorage.removeItem(key);
  }

  /**
   * Flush everything from localstorage, use with CAUTION
   */
  flushStorage(): void{
    localStorage.clear();
  }

}
