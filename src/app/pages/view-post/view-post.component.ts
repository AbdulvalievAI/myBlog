import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { IPost } from '../../../services/IPost';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit, OnDestroy {
  private _postId: string;
  private _routeSubscription$: Subscription;
  public post: IPost;

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private _localStorageService: LocalStorageService,
    private _sessionStorageService: SessionStorageService
  ) {
    this._routeSubscription$ = _activatedRoute.params.subscribe(
      (params) => (this._postId = params.id)
    );
  }

  ngOnInit(): void {
    this.post = this._localStorageService.getPostById(this._postId);
    if (!this.post) {
      this._router.navigateByUrl('/main');
    }
  }

  ngOnDestroy(): void {
    this._routeSubscription$.unsubscribe();
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
