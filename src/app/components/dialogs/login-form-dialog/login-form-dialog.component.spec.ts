import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormDialogComponent } from './login-form-dialog.component';

describe('LoginFormDialogComponent', () => {
  let component: LoginFormDialogComponent;
  let fixture: ComponentFixture<LoginFormDialogComponent>;

  beforeEach(async(() => {
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
