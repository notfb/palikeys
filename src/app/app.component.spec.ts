import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {SwUpdate} from '@angular/service-worker';
import {SwUpdateMock} from './swUpdate.mock';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {MatDialog} from '@angular/material';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: SwUpdate, useClass: SwUpdateMock},
        // TODO: inject proper mock
        {provide: MatDialog, useInstance: {}},
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have not have updates available after init`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.updateAvailable).toEqual(false);
  });

  it('should render title with a test-title class', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.test-title').textContent).toContain('Keyboard Tutor - ALPHA');
  });
});
