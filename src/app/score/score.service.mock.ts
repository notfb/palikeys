import {Observable, of} from 'rxjs';
import {Score} from './_models/scroe.model';

export class ScoreServiceMock {

  update(id: string, score: number): Observable<Object> {
    return of({});
  }

  get(id: string): Observable<Score> {
    return of({id: 'mockId', username: 'mockUser', score: 2342});
  }
}
