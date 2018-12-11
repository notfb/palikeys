import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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

  constructor(private scoreService: ScoreService,
              private changeDetectorRefs: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.scoreService.list().subscribe(list => {
      this.scores = list;
      console.log('updated scores list', list);
      // TODO: use obserable stream or data source to update table, instead of triggering the change detector
      this.changeDetectorRefs.detectChanges();
    }, error => this.errorMessage = 'Failed to load high score');
  }

}
