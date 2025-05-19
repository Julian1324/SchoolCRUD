import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../../modules/shared/custom-components/error-dialog/error-dialog.component';
import { SuccessDialogComponent } from '../../modules/shared/custom-components/success-dialog/success-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private dialog: MatDialog) { }

  showError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '300px',
    });
  }


  showSuccess(message: string) {
    this.dialog.open(SuccessDialogComponent, {
      data: { message },
      width: '300px',
    });
  }
}
