import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatGridListModule, MatToolbarModule} from '@angular/material';
import {ScoreService} from './score/score.service';
import {LessonComponent} from './lesson/lesson.component';
import {LessonService} from './lesson/lesson.service';

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule
  ],
  providers: [ScoreService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
