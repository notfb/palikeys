import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GdprSnackBarComponent} from './gdpr-snack-bar.component';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

describe('GdprSnackBarComponent', () => {
  let component: GdprSnackBarComponent;
  let fixture: ComponentFixture<GdprSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GdprSnackBarComponent],
      providers: [{
        provide: MAT_SNACK_BAR_DATA, useValue: {
          dismiss: () => {
          }
        }
      }]
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
