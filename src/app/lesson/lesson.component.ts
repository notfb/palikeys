import {Component, OnInit} from '@angular/core';
import {ScoreService} from '../score/score.service';
import {Score} from '../score/_models/scroe.model';
import {UserService} from '../user/user.service';
import {switchMap} from 'rxjs/internal/operators';

// TODO: try to fetch a recent score from the server once in a while???
// TODO: unsubscribe observables onNgDestory
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html'
})
export class LessonComponent implements OnInit {
  score: Score = {id: 'offline_id', username: 'anonymous', score: 0};

  constructor(private scoreService: ScoreService, private userService: UserService) {
  }

  ngOnInit() {
    this.userService.updates()
      .pipe(switchMap(username => this.scoreService.getByName(username)))
      .subscribe(
        score => this.score = score,
        error => {
          if (error.status === 404) {
            // FIXME: should not use userService.username but username from initial switchMap call
            this.scoreService.create({username: this.userService.username, score: 0})
              .pipe(switchMap(() => this.scoreService.getByName(this.userService.username)))
              .subscribe(score => this.score = score);
          }
        });
  }

  onScoreIncrement(score: number) {
    // FIXME: handle case where we failed to fetch the score data from the server
    this.scoreService.increment(this.score.id, score).subscribe(() => {
      this.score.score += score;
    }, () => {
      // TODO: store score update and send it when online / later
      this.score.score += score;
    });
  }
}
