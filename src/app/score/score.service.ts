import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Score} from './_models/scroe.model';

// TODO: introduce generic REST service for mocking in tests etc.
@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private static readonly BASE_URL = 'https://palikeys-serverless.firebaseapp.com/api/score';

  constructor(private http: HttpClient) {
  }

  update(id: string, score: number): Observable<Object> {
    // FIXME: Why am I seeing the log message but no requests???
    // Even when I set the service worker to 'bypass for network'
    console.log('fooo', score, id);
    this.http.get(`${ScoreService.BASE_URL}/${id}`);
    this.http.put(`${ScoreService.BASE_URL}/${id}`, {score});
    this.http.post(`${ScoreService.BASE_URL}/${id}`, {score});
    return this.http.patch(`${ScoreService.BASE_URL}/${id}`, {score});
  }

  get(id: string): Observable<Score> {
    return this.http.get(`${ScoreService.BASE_URL}/${id}`) as Observable<Score>;
  }
}
