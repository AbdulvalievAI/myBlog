import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistrationFormDialogComponent } from './registration-form-dialog.component';

describe('RegistrationFormDialogComponent', () => {
  let component: RegistrationFormDialogComponent;
  let fixture: ComponentFixture<RegistrationFormDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationFormDialogComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationFormDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
