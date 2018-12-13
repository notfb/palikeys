import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LessonViewComponent} from './lesson-view.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';

describe('LessonViewComponent', () => {
  let component: LessonViewComponent;
  let fixture: ComponentFixture<LessonViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LessonViewComponent],
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonViewComponent);
    component = fixture.componentInstance;
    component.layoutType = 'qwerty';
    component.lessonNumber = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
