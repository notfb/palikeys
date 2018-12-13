import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';
import {skip} from 'rxjs/internal/operators';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should emit default user value', () => {
    const service: UserService = TestBed.get(UserService);
    service.updates().subscribe(u => expect(u).toBe('anonymous'));
    expect(service.username).toBe('anonymous');
  });

  it('should emit new user value', () => {
    const service: UserService = TestBed.get(UserService);
    const username = 'username';
    service.updates().pipe(skip(1)).subscribe(u => expect(u).toBe(username));
    service.username = username;
    expect(service.username).toBe(username);
  });
});
