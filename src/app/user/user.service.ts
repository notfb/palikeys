import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _username = 'anonymous';
  private readonly userUpdates: Subject<string> = new Subject();

  constructor() {
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
    console.log('new username', username);
    this.userUpdates.next(username);
  }


  updates(): Observable<string> {
    return this.userUpdates.asObservable();
  }
}
