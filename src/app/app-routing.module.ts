import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LessonComponent} from './lesson/lesson.component';

// TODO: validate lessonNumber with matcher
const routes: Routes = [
  {path: '', redirectTo: 'lesson/1', pathMatch: 'full'},
  {path: 'lesson/:lessonNumber', component: LessonComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
