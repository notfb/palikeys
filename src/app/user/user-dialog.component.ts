import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface UserDialogData {
  username: string;
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: 'user-dialog.html',
})
export class UserDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
