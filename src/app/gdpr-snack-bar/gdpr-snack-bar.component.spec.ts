import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GdprSnackBarComponent} from './gdpr-snack-bar.component';

describe('GdprSnackBarComponent', () => {
  let component: GdprSnackBarComponent;
  let fixture: ComponentFixture<GdprSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GdprSnackBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GdprSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
