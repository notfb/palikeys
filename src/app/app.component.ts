import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from '@angular/material';
import {UserDialogComponent} from './user/user-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  updateAvailable = false;
  username: string;

  constructor(private updates: SwUpdate, public dialog: MatDialog) {
    updates.available.subscribe(() => {
      this.updateAvailable = true;
    });
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: {username: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.username = result;
    });
  }

}

