import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';
import {ScoreListComponent} from './score/score-list/score-list.component';
import {InfoComponent} from './info/info.component';

// TODO: validate lessonNumber & layoutType with matcher
const routes: Routes = [
  {path: '', redirectTo: 'lesson/qwerty/1', pathMatch: 'full'},
  {path: 'lesson/:layoutType/:lessonNumber', component: LessonComponent},
  {path: 'score', component: ScoreListComponent},
  {path: 'info', component: InfoComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
