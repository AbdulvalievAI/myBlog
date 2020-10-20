import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NewsApiService } from '../../../services/news-api/news-api.service';
import { IPost } from '../../../services/IPost';
import { ISourceData } from '../../../services/ISourceData';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user/user.service';
/*import { LocalStorageService } from '../../../services/local-storage/local-storage.service';*/

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  private _isStopLoad: boolean;
  private _sourceDataService: ISourceData;
  private _sourceDataSub: Subscription;
  private _page = 1;
  private _pageSize = 5;
  public isLoad: boolean;
  public posts: Array<IPost> = [];

  constructor(
    sourceDataService: NewsApiService,
    /*sourceDataService: LocalStorageService,*/
    private _router: Router,
    public userService: UserService
  ) {
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
    this._sourceDataSub = this._sourceDataService
      .getPosts(this._page, this._pageSize)
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
        error: (err) => {
          console.log(err);
          console.error(err.error.message);
          this.isLoad = false;
          this._isStopLoad = true;
        },
      });
  }

  public fabHandler(): void {
    this._router.navigateByUrl('/post');
  }
}
