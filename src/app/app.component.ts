import {Component} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog} from '@angular/material';
import {UserDialogComponent} from './user/user-dialog.component';
import {UserService} from './user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  updateAvailable = false;

  constructor(private updates: SwUpdate, private dialog: MatDialog, private userSerivce: UserService) {
    updates.available.subscribe(() => {
      this.updateAvailable = true;
    });
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: {username: this.userSerivce.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userSerivce.username = result;
      }
    });
  }

}

