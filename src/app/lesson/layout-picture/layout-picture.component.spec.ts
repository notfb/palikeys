import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LayoutPictureComponent} from './layout-picture.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('LayoutPictureComponent', () => {
  let component: LayoutPictureComponent;
  let fixture: ComponentFixture<LayoutPictureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LayoutPictureComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
