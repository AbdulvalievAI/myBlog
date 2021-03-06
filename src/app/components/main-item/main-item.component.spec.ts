import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MainItemComponent } from './main-item.component';

describe('MainItemComponent', () => {
  let component: MainItemComponent;
  let fixture: ComponentFixture<MainItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MainItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
