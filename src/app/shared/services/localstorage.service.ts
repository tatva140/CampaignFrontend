import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setItem(value: any): void {
    try {
      localStorage.setItem("Token", JSON.stringify(value));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  }

  getItem():any {
    try {
      const item = localStorage.getItem("Token");
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Error getting from localStorage', e);
      return null;
    }
  }

  removeItem(): void {
    try {
      localStorage.removeItem("Token");
    } catch (e) {
      console.error('Error removing from localStorage', e);
    }
  }

  clear(): void {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Error clearing localStorage', e);
    }
  }

}