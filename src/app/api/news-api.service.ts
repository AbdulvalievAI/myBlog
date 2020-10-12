import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IResponse } from './iresponse';

@Injectable({
  providedIn: 'root',
})
export class NewsApiService {
  private apiUrl = 'https://newsapi.org/v2/';
  private apiKey = '44caf8fd958444179e57d926c439f559';

  constructor(private httpClient: HttpClient) {}

  private getConfig(method: string, filters: string): Observable<any> {
    return this.httpClient.get(
      `${this.apiUrl}${method}?apiKey=${this.apiKey}&${filters}`
    );
  }

  public getTopHeadlines(page = 1): Observable<IResponse> {
    return this.getConfig('top-headlines', `country=us&page=${page}`);
  }
}
