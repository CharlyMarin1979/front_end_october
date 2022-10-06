import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PeliculaCreacionDTO } from 'src/app/peliculas/pelicula';

@Component({
  selector: 'app-input-markdown',
  templateUrl: './input-markdown.component.html',
  styleUrls: ['./input-markdown.component.css']
})
export class InputMarkdownComponent implements OnInit {
  @Input()
  contenidoMarkdown = '';
  constructor() { }

  @Input()
  placeHolderTextarea: string = 'Texto';

  @Output()
  changeMarkdown: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
  }

  // inputTextArea(texto: string){
  //   //console.log(texto);
  //   this.contenidoMarkdown = texto;
  //   this.changeMarkdown.emit(texto);
  // }
  
}
