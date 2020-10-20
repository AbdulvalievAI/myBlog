import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { IPost } from '../../../services/IPost';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public postFG: FormGroup;
  private _routeSubscription$: Subscription;
  private _postId: IPost['id'];
  private _post: IPost;
  public typeAction: 'create' | 'edit' = 'create';

  constructor(
    private _fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute
  ) {
    this._routeSubscription$ = _activatedRoute.params.subscribe(
      (params) => (this._postId = params.id)
    );
  }

  ngOnInit(): void {
    if (this._postId) {
      const post = this._localStorageService.getPostById(this._postId);
      if (!post || post.typeSource === 'api') {
        this._router.navigateByUrl('/main');
        return;
      }
      const userSession = this._sessionStorageService.getSession();
      if (userSession.login !== post.author) {
        this._router.navigateByUrl('/main');
        return;
      }

      this.typeAction = 'edit';
      this._post = post;
      this.postFG = this._fb.group({
        title: [this._post.title, Validators.required],
        description: [this._post.description, Validators.required],
      });
    } else {
      this.postFG = this._fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  }

  public createPost(): void {
    const post: IPost = {
      id: uuid.v4(),
      typeSource: 'local',
      title: this.postFG.value.title,
      description: this.postFG.value.description,
      author: this._sessionStorageService.getSession().login,
      publishedAt: new Date().toISOString(),
    };
    this._localStorageService.savePosts([post]);
    this._router.navigateByUrl('/main');
  }

  public editPost(): void {
    const post: IPost = {
      ...this._post,
      title: this.postFG.value.title,
      description: this.postFG.value.description,
      publishedAt: new Date().toISOString(),
    };
    this._localStorageService.savePosts([post]);
    this._router.navigateByUrl('/main');
  }

  ngOnDestroy(): void {
    this._routeSubscription$.unsubscribe();
  }

  public removePost(): void {
    const isDeleted = confirm(
      'Are you sure that you want to remove this post?'
    );
    if (isDeleted) {
      this._localStorageService.removePost(this._post.id);
      this._router.navigateByUrl('/main');
    }
  }
}
