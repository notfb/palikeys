import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';
import {ScoreListComponent} from './score/score-list/score-list.component';

// TODO: validate lessonNumber & layoutType with matcher
const routes: Routes = [
  {path: '', redirectTo: 'lesson/qwerty/1', pathMatch: 'full'},
  {path: 'lesson/:layoutType/:lessonNumber', component: LessonComponent},
  {path: 'score', component: ScoreListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
