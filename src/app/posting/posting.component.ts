import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Posting } from './posting';

@Component({
  selector: 'app-posting',
  templateUrl: './posting.component.html',
  styleUrls: ['./posting.component.scss']
})
export class PostingComponent implements OnInit {

  @Input() posting: Posting | null = null;
  @Output() edit = new EventEmitter<Posting>();
  constructor() { }

  ngOnInit(): void {
  }

}
