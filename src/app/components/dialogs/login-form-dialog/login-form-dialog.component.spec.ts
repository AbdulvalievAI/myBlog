import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LoginFormDialogComponent } from './login-form-dialog.component';

describe('LoginFormDialogComponent', () => {
  let component: LoginFormDialogComponent;
  let fixture: ComponentFixture<LoginFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LoginFormDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
