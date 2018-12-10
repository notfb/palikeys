import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  updateAvailable = false;

  constructor(private updates: SwUpdate) {
    updates.available.subscribe(() => {
      this.updateAvailable = true;
    });
  }

}
