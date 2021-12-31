import { Component } from '@angular/core';
import { Posting } from './posting/posting';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PostingDialogComponent } from './posting-dialog/posting-dialog.component';
import { PostingDialogResult } from './posting-dialog/posting-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'unlimited-pasta';
  postList = new Observable <Posting[]>();
  ngOnInit(){
    this.postList = this.store.collection('postings').valueChanges({ idField: 'id' }) as Observable <Posting[]>;    
  }

  constructor(private dialog: MatDialog, private store: AngularFirestore ) { }

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
      const post = this.store.collection('postings').doc(posting.id);
      if (result.delete) {
        post.delete();
      } else {
        post.update(posting);
      }
    })
    this.ngOnInit();
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
    .subscribe((result: PostingDialogResult) => this.store.collection('postings').add(result.posting));
  }
}
