import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AzkarCategoryListModel } from '../../features/azkar/models/azkar-list.model';
import { AzkarContentListModel } from '../../features/azkar/models/azkar-content-list.model';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AzkarService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'http://localhost:5269/api/';
  private url = 'https://libretranslate.com/translate';

  getAzkars() {
    const headers = { 'Accept-Language': 'en' };
    const response = this.http.get<AzkarCategoryListModel>(
      `${this.apiUrl}azkar/categories/get`,
      { headers }
    );
    return response;
  }
  getAzkarContent(id: string,pageNumber:number,pageSize:number) {
    const headers = { 'Accept-Language': 'en' };
    const response = this.http.get<AzkarContentListModel>(
      `${this.apiUrl}azkar/categories/${id}/get?pageNumber=${pageNumber}&pageSize=${pageSize}`,
      { headers }
    );
    return response;
  }
  getSubCategories(id: string) {
    const headers = { 'Accept-Language': 'en' };
    const response = this.http.get<AzkarCategoryListModel>(
      `${this.apiUrl}azkar/categories/get?parentCategoryId=${id}`,
      { headers }
    );
    return response;
  }
  bookmarkAzkar(id: string) {
    const response = this.http.post(
      `${this.apiUrl}azkar/bookmark/${id}`,
      {}
    );
    return response;
  }
}
