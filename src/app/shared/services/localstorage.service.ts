import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  private isBrowser: boolean;

  constructor() {
    this.isBrowser = typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  setItem(value: any): void {
    if (this.isBrowser) {
      try {
        localStorage.setItem("Token", JSON.stringify(value));
      } catch (e) {
        console.error('Error saving to localStorage', e);
      }
    }
  }

  getItem(): any {
    if (this.isBrowser) {
      try {
        const item = localStorage.getItem("Token");
        return item ? JSON.parse(item) : null;
      } catch (e) {
        console.error('Error getting from localStorage', e);
        return null;
      }
    }
    return null;
  }

  removeItem(): void {
    if (this.isBrowser) {
      try {
        localStorage.removeItem("Token");
      } catch (e) {
        console.error('Error removing from localStorage', e);
      }
    }
  }

  clear(): void {
    if (this.isBrowser) {
      try {
        localStorage.clear();
      } catch (e) {
        console.error('Error clearing localStorage', e);
      }
    }
  }

}