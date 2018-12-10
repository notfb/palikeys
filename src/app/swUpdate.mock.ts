import {Observable, Subject} from 'rxjs';
import {UpdateAvailableEvent} from '@angular/service-worker/src/low_level';

export class SwUpdateMock {
  public available: Observable<UpdateAvailableEvent> = new Subject();
}
