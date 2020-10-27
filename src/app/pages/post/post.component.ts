import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { IPost } from '../../../interfaces/IPost';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from '../../../services/notifier/notifier.service';
import { takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  public postFG: FormGroup;
  private _postId: IPost['id'];
  private _post: IPost;
  public typeAction: 'create' | 'edit' = 'create';
  // TODO переименовать в _isSubscribe
  private _isUnsubscribe = false;

  constructor(
    private _fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeWhile(() => !this._isUnsubscribe))
      .subscribe((params) => (this._postId = params.id));

    // TODO Условие вынести в subscribe у _activatedRoute
    // TODO Реализовать метод getPost c LocalStorageService
    // TODO Реализовать initForm
    // TODO убрать переменную this._postId
    if (this._postId) {
      const post = this._localStorageService.getPostById(this._postId);
      // TODO сделать выброс на экран Main через AuthGuard
      if (!post || post.typeSource === 'api') {
        this._router.navigateByUrl('/main');
        return;
      }
      // TODO сделать выброс на экран Main через AuthGuard
      const userSession = this._sessionStorageService.getSession();
      if (userSession.login !== post.author) {
        this._router.navigateByUrl('/main');
        return;
      }
      this.typeAction = 'edit';
      this._post = post;
      // TODO переделать на this.postFG.setValue()
      this.postFG = this._fb.group({
        title: [this._post.title, Validators.required],
        description: [this._post.description, Validators.required],
      });
    } else {
      // TODO переделать на this.postFG.setValue()
      this.postFG = this._fb.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
      });
    }
  }

  ngOnDestroy(): void {
    this._isUnsubscribe = true;
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
    this._notifierService.snackBar('default', 'Post created successfully!');
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
    this._notifierService.snackBar('default', 'Post saved successfully!');
    this._router.navigateByUrl('/main');
  }

  public removePost(): void {
    const isDeleted = confirm(
      'Are you sure that you want to remove this post?'
    );
    if (isDeleted) {
      this._localStorageService.removePost(this._post.id);
      this._notifierService.snackBar('default', 'Post successfully deleted!');
      this._router.navigateByUrl('/main');
    }
  }
}
