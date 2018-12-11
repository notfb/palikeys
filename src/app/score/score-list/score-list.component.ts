import {Component, OnInit} from '@angular/core';
import {ScoreService} from '../score.service';
import {Score} from '../_models/scroe.model';

@Component({
  selector: 'app-score-list',
  templateUrl: './score-list.component.html',
  styleUrls: ['./score-list.component.scss']
})
export class ScoreListComponent implements OnInit {
  scores: Score[] = [{username: 'test', score: 23, id: 'testId'}];
  displayedColumns: string[] = ['name', 'score'];
  errorMessage: string | undefined;

  constructor(private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.scoreService.list().subscribe(list => this.scores = list, error => this.errorMessage = error.message || error);
  }

}
