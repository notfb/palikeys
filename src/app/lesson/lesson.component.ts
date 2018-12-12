import {Component, OnInit} from '@angular/core';
import {ScoreService} from '../score/score.service';
import {Score} from '../score/_models/scroe.model';

// TODO: try to fetch a recent score from the server once in a while???
@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html'
})
export class LessonComponent implements OnInit {
  score: Score = {id: 'offline_id', username: '', score: 0};

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    // TODO: get by username
    this.scoreService.get('d3zDQ8jIeqKKNxICAW3I').subscribe((score: Score) => this.score = score);
  }

  onScoreIncrement(score: number) {
    // TODO: update by username / id
    this.scoreService.increment('d3zDQ8jIeqKKNxICAW3I', score).subscribe(() => {
      this.score.score += score;
    }, () => {
      // TODO: store score update and send it when online / later
      this.score.score += score;
    });
  }
}
