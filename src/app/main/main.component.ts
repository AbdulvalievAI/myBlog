import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NewsApiService } from '../sourceData/news-api/news-api.service';
import { INew } from '../sourceData/inew';
import { ISourceData } from '../sourceData/ISourceData';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private _isStopLoad: boolean;
  private _sourceDataService: ISourceData;
  private _sourceDataSub: Subscription;
  public isLoad: boolean;
  public news: Array<INew> = [];

  constructor(sourceDataService: NewsApiService) {
    this._sourceDataService = sourceDataService;
  }

  ngOnInit(): void {
    this.getNews();
  }

  ngOnDestroy(): void {
    this._sourceDataSub.unsubscribe();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    if (
      !this._isStopLoad &&
      !this.isLoad &&
      window.innerHeight + 700 + window.scrollY >= document.body.offsetHeight
    ) {
      this.getNews();
    }
  }

  public getNews(): void {
    this.isLoad = true;
    this._sourceDataSub = this._sourceDataService.getPosts().subscribe({
      next: (data) => {
        if (data.length) {
          this.news.push(...data);
        } else {
          this._isStopLoad = true;
        }
        this.isLoad = false;
      },
      error: (err) => {
        console.log(err);
        console.error(err.error.message);
        this.isLoad = false;
        this._isStopLoad = true;
      },
    });
  }
}
