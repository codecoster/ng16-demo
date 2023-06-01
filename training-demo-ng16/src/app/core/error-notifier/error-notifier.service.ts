import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from './error-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorNotifierService {

  constructor(private dialog: MatDialog) {
  }

  openErrorModal(errorMsg: string): void {
    this.dialog.open(ErrorModalComponent, {data: {message: errorMsg}});
  }
}
