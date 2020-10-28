import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { IPost } from '../../../interfaces/post.interface';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { takeWhile } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit, OnDestroy {
  public post: IPost;
  private _isSubscribe = true;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe((params) => {
        this.post = this.getPost(params.id);
      });
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
  }

  private getPost(postId: IPost['id']): IPost {
    return this._localStorageService.getPostById(postId);
  }

  public isEdit(): boolean {
    const userSession = this._sessionStorageService.getSession();
    if (!userSession) {
      return false;
    }
    if (this.post.typeSource !== 'local') {
      return false;
    }
    return userSession.login === this.post.author;
  }

  public backBtnHandler(): void {
    this._location.back();
  }
}
