import { AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { RatingComponent } from '../utilidades/rating/rating.component';

@Component({
  selector: 'app-ciclo-de-vida',
  templateUrl: './ciclo-de-vida.component.html',
  styleUrls: ['./ciclo-de-vida.component.css']
})
export class CicloDeVidaComponent implements OnInit, OnChanges, OnDestroy, DoCheck, AfterViewInit {

  constructor(private changesDetectorRef: ChangeDetectorRef) { }

  @Input()
  titulo: string;

  @ViewChild(RatingComponent)
  ratingComponent: RatingComponent;

  timer: ReturnType<typeof setInterval>;

  ngOnChanges(changes: SimpleChanges): void {
    console.log('on changes');
    console.log(changes);
  }
  ngOnDestroy(): void {
    console.log('on destroy');
    clearInterval(this.timer);
  }
  ngDoCheck(): void {
    console.log('on DoCheck');
  }
  ngAfterViewInit(): void {
    console.log('on After View Init');
    this.ratingComponent.ratingSelected = 3;
    this.changesDetectorRef.detectChanges();
  }

  ngOnInit(): void {
    console.log('on init');
    this.timer = setInterval(() => console.log(new Date()), 1000);
  }

}
