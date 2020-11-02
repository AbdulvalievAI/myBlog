import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { IPost } from '../../../interfaces/post.interface';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { filter, takeWhile } from 'rxjs/operators';
import { ErrorsService } from '../../../services/errors/errors.service';
import { SourceDataService } from '../../../services/source-data/source-data.service';
import {
  CdkVirtualScrollViewport,
  ScrollDispatcher,
} from '@angular/cdk/scrolling';
import { BehaviorSubject } from 'rxjs';

const BOTTOM_SCROLL_THRESHOLD = 100;

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, AfterViewInit, OnDestroy {
  private _page = 1;
  private _pageSize = 5;
  public isLoad = false;
  private _isSubscribe = true;
  public itemSize = 180;
  public window: Window;
  public posts = new BehaviorSubject<IPost[]>([]);

  @ViewChild('cdkScroll') cdkScroll: CdkVirtualScrollViewport;
  private _isSubscribeScroll = true;

  constructor(
    private _sourceDataService: SourceDataService,
    private _router: Router,
    public userService: UserService,
    private _errorsService: ErrorsService,
    private _scrollDispatcher: ScrollDispatcher
  ) {
    this.window = window;
  }

  ngOnInit(): void {
    this.getNews();
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
    this._isSubscribeScroll = false;
  }

  public fabHandler(): void {
    this._router.navigateByUrl('/post');
  }

  ngAfterViewInit(): void {
    this.cdkScroll
      .elementScrolled()
      .pipe(
        takeWhile(() => this._isSubscribeScroll),
        filter(
          () =>
            this.cdkScroll.measureScrollOffset('bottom') <=
              BOTTOM_SCROLL_THRESHOLD && !this.isLoad
        )
      )
      .subscribe(() => {
        this.getNews();
      });
  }

  public getNews(): void {
    this.isLoad = true;
    this._sourceDataService
      .getPosts(this._page, this._pageSize)
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe({
        next: (data) => {
          if (data?.length) {
            this.setNextPosts(data);
            this._page += 1;
          } else {
            this._isSubscribeScroll = false;
          }
          this.isLoad = false;
        },
        error: (err: HttpErrorResponse) => {
          this._errorsService.handleError(err.error);
          this.isLoad = false;
          this._isSubscribeScroll = false;
        },
      });
  }

  private setNextPosts(newPosts: Array<IPost>): void {
    this.posts.next([...this.posts.value, ...newPosts]);
  }
}
