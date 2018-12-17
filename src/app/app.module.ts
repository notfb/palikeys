import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {ScoreService} from './score/score.service';
import {LessonComponent} from './lesson/lesson.component';
import {LessonService} from './lesson/lesson.service';
import {FormsModule} from '@angular/forms';
import {LessonViewComponent} from './lesson/lesson-view/lesson-view.component';
import {HttpClientModule} from '@angular/common/http';
import {ScoreListComponent} from './score/score-list/score-list.component';
import {InfoComponent} from './info/info.component';
import {UserDialogComponent} from './user/user-dialog.component';
import {HelpComponent} from './help/help.component';
import {LayoutPictureComponent} from './lesson/layout-picture/layout-picture.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonComponent,
    LessonViewComponent,
    ScoreListComponent,
    InfoComponent,
    UserDialogComponent,
    HelpComponent,
    LayoutPictureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule
  ],
  entryComponents: [
    UserDialogComponent,
  ],
  providers: [ScoreService, LessonService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
