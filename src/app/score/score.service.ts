import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Score} from './_models/scroe.model';

// TODO: instead of using update to set a new score, send the score from current lesson as an increment and ...
// TODO: make updates / increments work offline (aka store and send later...)
// https://blog.formpl.us/how-to-handle-post-put-requests-in-offline-applications-using-service-workers-indexedb-and-da7d0798a9ab

// TODO: introduce generic REST service for mocking in tests etc.
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private static readonly BASE_URL = 'https://palikeys-serverless.firebaseapp.com/api/score';

  constructor(private http: HttpClient) {
  }

  update(id: string, score: number): Observable<Object> {
    return this.http.patch(`${ScoreService.BASE_URL}/${id}`, {score});
  }

  get(id: string): Observable<Score> {
    return this.http.get(`${ScoreService.BASE_URL}/${id}`) as Observable<Score>;
  }

  list(): Observable<Score[]> {
    return this.http.get(ScoreService.BASE_URL) as Observable<Score[]>;
  }
}
