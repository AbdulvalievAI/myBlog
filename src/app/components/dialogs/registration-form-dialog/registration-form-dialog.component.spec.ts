import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationFormDialogComponent } from './registration-form-dialog.component';

describe('RegistrationFormDialogComponent', () => {
  let component: RegistrationFormDialogComponent;
  let fixture: ComponentFixture<RegistrationFormDialogComponent>;

  beforeEach(async(() => {
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
