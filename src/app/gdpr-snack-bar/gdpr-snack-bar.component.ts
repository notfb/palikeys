import {Component, Inject} from '@angular/core';
import {MAT_SNACK_BAR_DATA} from '@angular/material';

@Component({
  selector: 'app-gdpr-snack-bar',
  templateUrl: './gdpr-snack-bar.component.html',
  styleUrls: ['./gdpr-snack-bar.component.scss']
})
export class GdprSnackBarComponent {
  private dismiss: Function;

  constructor(@Inject(MAT_SNACK_BAR_DATA) private data: { dismiss: Function }) {
    this.dismiss = data.dismiss;
  }

  accept() {
    this.dismiss();
  }

}
