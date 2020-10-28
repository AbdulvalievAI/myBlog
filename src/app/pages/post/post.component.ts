import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
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
    private _dialogsService: DialogsService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    this.initForm();
    this._activatedRoute.params
      .pipe(takeWhile(() => this._isSubscribe))
      .subscribe((params) => {
        const postId = params.id;
        if (!postId) {
          return;
        }
        this.typeAction = 'edit';
        this._post = this.getPost(postId);

        this.postFG.setValue({
          title: this._post.title,
          description: this._post.description,
        });
      });
  }

  ngOnDestroy(): void {
    this._isSubscribe = false;
  }

  private initForm(): void {
    this.postFG = this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  private getPost(postId: IPost['id']): IPost {
    return this._localStorageService.getPostById(postId);
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

  public getPostFGDirty(): boolean {
    return this.postFG.dirty;
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

  public cancelBtnHandler(): void {
    this._location.back();
  }
}
