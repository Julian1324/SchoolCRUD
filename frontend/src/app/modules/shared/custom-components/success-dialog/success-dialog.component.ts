import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-dialog',
  templateUrl: './success-dialog.component.html',
  styleUrls: ['./success-dialog.component.css']
})
export class SuccessDialogComponent {
  message: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<SuccessDialogComponent>
  ) {
    this.message = data.message;

    setTimeout(() => {
      this.dialogRef.close();
    }, 2000);
  }
}
