import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {

  @Input()
  maxRaiting = 5;

  @Input()
  ratingSelected = 0;

  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  maxRaitingArray = [];

  userVote = false;

  lastRating;

  constructor() { }

  ngOnInit(): void {
    this.maxRaitingArray = Array(this.maxRaiting).fill(0);
  }

  manejarMouseEnter(index: number): void{
    this.ratingSelected = index + 1;
  }

  manejarMouseLeave(){
    if(this.lastRating !== 0){
      this.ratingSelected = this.lastRating
    }
    else{
      this.ratingSelected = 0;
    }
    
  }

  rate(index: number): void{
    this.ratingSelected = index + 1;
    this.userVote = true;
    this.lastRating = this.ratingSelected;
    this.rated.emit(this.ratingSelected);

  }

}
