import { Component } from '@angular/core';
import { Posting } from './posting/posting';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostingDialogComponent } from './posting-dialog/posting-dialog.component';
import { PostingDialogResult } from './posting-dialog/posting-dialog.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unlimited-pasta';
  postList: Posting[] = [
    {
      title: 'First Post',
      body: 'This is the first post...'
    },
    {
      title: 'Second Post',
      body: 'This is the second post...'
    }
  ]
  constructor(private dialog: MatDialog) {}
  editPosting(posting: Posting): void { 
    const dialogRef = this.dialog.open(PostingDialogComponent, {
      width: '270px',
      data: {
        posting: posting,
        enableDelete: true
      }
    });
    dialogRef.afterClosed().subscribe((result: PostingDialogResult|undefined) => {
      if (!result) {
        return;
      }
      const dataList = this.postList;
      const postingIndex = dataList.indexOf(posting);
      if (result.delete) {
        dataList.splice(postingIndex, 1);
      } else {
        dataList[postingIndex] = posting;
      }
    })
  }
  addPosting(): void {
    const dialogRef = this.dialog.open(PostingDialogComponent, {
      width: '270px',
      data: {
        posting: {},
      },
    });
    dialogRef
    .afterClosed()
    .subscribe((result: PostingDialogResult) => this.postList.push(result.posting));
  }
}
