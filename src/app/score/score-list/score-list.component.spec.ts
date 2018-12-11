import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ScoreListComponent} from './score-list.component';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {ScoreService} from '../score.service';
import {ScoreServiceMock} from '../score.service.mock';
import {MatTableModule} from '@angular/material';

describe('ScoreListComponent', () => {
  let component: ScoreListComponent;
  let fixture: ComponentFixture<ScoreListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScoreListComponent],
      imports: [MatTableModule],
      providers: [{provide: ScoreService, useClass: ScoreServiceMock}],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoreListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
