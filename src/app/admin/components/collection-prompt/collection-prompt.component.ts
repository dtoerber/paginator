import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'marrick-admin-prompt',
  template: `
    <h3 mat-dialog-title>{{ title }}</h3>
    <mat-dialog-content>
      <p>{{ dialogMessage }}</p>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="cancel()">
        CANCEL
      </button>
      <button mat-button (click)="confirm()">
        YES
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        max-width: 300px;
      }
      mat-dialog-actions {
        display: flex;
        justify-content: flex-end;
      }
      [mat-button] {
        padding: 0;
      }
    `
  ]
})
export class CollectionPromptComponent {
  title: string;
  dialogMessage: string;

  constructor(
    private ref: MatDialogRef<CollectionPromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.title = data.title;
    this.dialogMessage = data.message;
  }

  cancel() {
    this.ref.close(false);
  }

  confirm() {
    this.ref.close(true);
  }
}
