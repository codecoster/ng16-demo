import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-error-modal',
  standalone: true,
  templateUrl: './error-modal.component.html',
  imports: [
    MatDialogModule
  ],
  styleUrls: ['./error-modal.component.scss']
})
export class ErrorModalComponent {
  message: string;

  constructor(public dialogRef: MatDialogRef<ErrorModalComponent>,
              @Inject(MAT_DIALOG_DATA) data: { message: string }) {
    this.message = data.message;
  }

  close(): void {
    this.dialogRef.close();
  }
}
