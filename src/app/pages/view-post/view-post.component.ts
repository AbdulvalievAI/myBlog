import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { IPost } from '../../../interfaces/IPost';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit, OnDestroy {
  private _postId: string;
  public post: IPost;
  private _isUnsubscribe = false;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) {
    _activatedRoute.params
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe((params) => (this._postId = params.id));
  }

  ngOnInit(): void {
    this.post = this._localStorageService.getPostById(this._postId);
    if (!this.post) {
      this._router.navigateByUrl('/main');
    }
  }

  ngOnDestroy(): void {
    this._isUnsubscribe = true;
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
}
