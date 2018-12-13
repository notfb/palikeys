import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _username = 'anonymous';

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  constructor() {
  }
}
