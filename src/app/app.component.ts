import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {MatDialog, MatSnackBar} from '@angular/material';
import {UserDialogComponent} from './user/user-dialog.component';
import {UserService} from './user/user.service';
import {LessonService} from './lesson/lesson.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  updateAvailable = false;

  constructor(private updates: SwUpdate,
              private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private userService: UserService,
              private lessonService: LessonService) {
    updates.available.subscribe(() => {
      this.updateAvailable = true;
    });
  }

  ngOnInit() {
    // this.snackBar.openFromComponent(GdprSnackBarComponent);
  }

  openUserDialog() {
    this.lessonService.keepFocus = false;
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '250px',
      data: {username: this.userService.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.userService.username = result;
      }
      this.lessonService.keepFocus = true;
    });
  }


}

