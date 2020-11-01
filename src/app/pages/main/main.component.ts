import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { IPost } from '../../../interfaces/post.interface';
import { ISourceData } from '../../../interfaces/source-data.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeWhile } from 'rxjs/operators';
import { ErrorsService } from '../../../services/errors/errors.service';
import { SourceDataService } from '../../../services/source-data/source-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  public isAuthUser = false;
  private _isStopLoad = false;
  private _page = 1;
  private _pageSize = 5;
  public isLoad = false;
  public posts: Array<IPost> = [];
  private _isSubscribe = true;

  constructor(
    private _sourceDataService: SourceDataService,
    private _router: Router,
    private _userService: UserService,
    private _errorsService: ErrorsService
  ) {}

  ngOnInit(): void {
    this._userService.isAuth$
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe((isAuth) => (this.isAuthUser = isAuth));
    this.getNews();
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
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
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe({
        next: (data) => {
          if (data?.length) {
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
