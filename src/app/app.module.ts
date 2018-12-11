import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule, MatGridListModule, MatTableModule, MatToolbarModule} from '@angular/material';
import {ScoreService} from './score/score.service';
import {LessonComponent} from './lesson/lesson.component';
import {LessonService} from './lesson/lesson.service';
import {FormsModule} from '@angular/forms';
import {LessonViewComponent} from './lesson/lesson-view/lesson-view.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreListComponent} from './score/score-list/score-list.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LessonViewComponent,
    ScoreListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule
  ],
  providers: [ScoreService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
