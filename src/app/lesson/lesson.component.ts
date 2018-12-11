import {Component, OnInit} from '@angular/core';
import {ScoreService} from '../score/score.service';
import {Score} from '../score/_models/scroe.model';


@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html'
})
export class LessonComponent implements OnInit {
  score: Score;

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.scoreService.get('d3zDQ8jIeqKKNxICAW3I').subscribe((score: Score) => this.score = score);
  }

  onScoreChanged(score: number) {
    this.scoreService.update(this.score.id, score);
  }
}
