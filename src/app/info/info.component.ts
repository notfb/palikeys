import {Component, OnInit} from '@angular/core';
import {UserService} from '../user/user.service';
import {ScoreService} from '../score/score.service';
import {switchMap} from 'rxjs/internal/operators';
import {Score} from '../score/_models/scroe.model';

@Component({
  selector: 'app-legal',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {
  score: Score | string;
  error: string;

  constructor(private userService: UserService,
              private scoreService: ScoreService) {
  }

  ngOnInit() {
    this.userService.updates()
      .pipe(switchMap(username => this.scoreService.getByName(username)))
      .subscribe(score => this.score = score,
        error => this.error = `Failed to load high score: ${error.message || error}`);
  }

  deleteHighScore() {
    if (typeof this.score === 'object') {
      this.scoreService.deleteById(this.score.id)
        .subscribe(() => this.score = 'DELETED',
          error => this.error = `Failed to delete high score: ${error.message || error}`);
    }
  }
}
