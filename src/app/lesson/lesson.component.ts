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
    // TODO: get by username
    this.scoreService.get('d3zDQ8jIeqKKNxICAW3I').subscribe((score: Score) => this.score = score);
  }

  onScoreChanged(score: number) {
    // TODO: update by username / id
    this.scoreService.update('d3zDQ8jIeqKKNxICAW3I', score).subscribe(() => {
    }, (error: any) => {
      console.error(error);
    });
  }
}
