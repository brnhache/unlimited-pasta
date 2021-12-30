import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Posting } from '../posting/posting';

@Component({
  selector: 'app-posting-dialog',
  templateUrl: './posting-dialog.component.html',
  styleUrls: ['./posting-dialog.component.scss']
})
export class PostingDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<PostingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PostingDialogData
    ) { }

  cancel(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}

export interface PostingDialogData {
  posting: Partial<Posting>;
  enableDelete: boolean;
}
export interface PostingDialogResult {
  posting: Posting;
  delete?: boolean;
}