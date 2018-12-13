import {TestBed} from '@angular/core/testing';

import {UserService} from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should emit new user value', () => {
    const service: UserService = TestBed.get(UserService);
    const username = 'username';
    service.updates().subscribe(u => expect(u).toBe(username));
    service.username = username;
    expect(service.username).toBe(username);
  });
});
