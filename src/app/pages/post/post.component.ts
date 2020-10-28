import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as uuid from 'uuid';
import { IPost } from '../../../interfaces/post.interface';
import { SessionStorageService } from '../../../services/session-storage/session-storage.service';
import { LocalStorageService } from '../../../services/local-storage/local-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NotifierService } from '../../../services/notifier/notifier.service';
import { takeWhile } from 'rxjs/operators';
import { DialogsService } from '../../../services/dialogs/dialogs.service';

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
  private _isSubscribe = true;

  constructor(
    private _fb: FormBuilder,
    private _sessionStorageService: SessionStorageService,
    private _localStorageService: LocalStorageService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _notifierService: NotifierService,
    private _dialogsService: DialogsService
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params
      .pipe(takeWhile(() => this._isSubscribe))
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
    this._isSubscribe = false;
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
    this._notifierService.snackBar('Default', 'Post created successfully!');
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
    this._notifierService.snackBar('Default', 'Post saved successfully!');
    this._router.navigateByUrl('/main');
  }

  public removePost(): void {
    this._dialogsService
      .openConfirm({
        description: 'Are you sure that you want to remove this post?',
      })
      .afterClosed()
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe((response) => {
        if (response?.isResolution) {
          this._localStorageService.removePost(this._post.id);
          this._notifierService.snackBar(
            'Default',
            'Post successfully deleted!'
          );
          this._router.navigateByUrl('/main');
        }
      });
  }
}
