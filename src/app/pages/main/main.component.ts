import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
/*import { NewsApiService } from 'src/services/news-api/news-api.service';*/
import { IPost } from '../../../interfaces/post.interface';
import { ISourceData } from '../../../interfaces/source-data.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { ErrorsService } from '../../../services/errors/errors.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private _isStopLoad: boolean;
  private _sourceDataService: ISourceData;
  private _page = 1;
  private _pageSize = 5;
  public isLoad: boolean;
  public posts: Array<IPost> = [];
  private _isUnsubscribe = false;

  constructor(
    // TODO переделать на сервис обёртку для переключения
    /*sourceDataService: NewsApiService,*/
    sourceDataService: LocalStorageService,
    private _router: Router,
    public userService: UserService,
    private _errorsService: ErrorsService
  ) {
    this._sourceDataService = sourceDataService;
  }

  ngOnInit(): void {
    this.getNews();
  }

  ngOnDestroy(): void {
    this._isUnsubscribe = true;
  }

  // TODO переделать на material scroll
  @HostListener('window:scroll', ['$event'])
  onScroll(): void {
    const endReachedThreshold = 700;
    if (
      !this._isStopLoad &&
      !this.isLoad &&
      window.innerHeight + endReachedThreshold + window.scrollY >=
        document.body.scrollHeight
    ) {
      this.getNews();
    }
  }

  public getNews(): void {
    this.isLoad = true;
    this._sourceDataService
      .getPosts(this._page, this._pageSize)
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe({
        next: (data) => {
          if (data && data.length) {
            this.posts.push(...data);
            this._page += 1;
          } else {
            this._isStopLoad = true;
          }
          this.isLoad = false;
        },
        error: (err: HttpErrorResponse) => {
          this._errorsService.handleError(err.error);
          this.isLoad = false;
          this._isStopLoad = true;
        },
      });
  }

  public fabHandler(): void {
    this._router.navigateByUrl('/post');
  }
}
