import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
      this.peliculasEnCines = [
        {
          titulo: 'Spider-Man',
          fechaLanzamiento: new Date(),
          precio: 599.99,
          poster: 'http://www.appocalypse.co/wp-content/uploads/2019/08/Spider-Man-Far-From-Home-Extended-Cut-Poster.jpg'
        },
        {
          titulo: 'Iron-MAN',
          fechaLanzamiento: new Date(),
          precio: 355.50,
          poster: 'http://orig02.deviantart.net/4350/f/2010/284/5/f/5f8dd18570404534a75808d112ad0181-d30kkv5.jpg'
        }
      ];
  }

  peliculasEnCines;
  peliculasProximosEstrenos = [
    {
      titulo: 'Avengers - END GAME',
      fechaLanzamiento: new Date(),
      precio: 599.99,
      poster: 'https://i5.walmartimages.com/asr/39aa3084-5c59-4239-a12e-6f9d4b3a8db7.2b0a193867a126ff747a5310a2a982fd.jpeg'
    },
    {
      titulo: 'ROCKY',
      fechaLanzamiento: new Date(),
      precio: 355.50,
      poster: 'http://img15.deviantart.net/c888/i/2012/211/d/9/rocky__original_poster__by_justanotherdood-d596loe.jpg'
    },
    {
      titulo: 'CHRISTINE',
      fechaLanzamiento: new Date(),
      precio: 355.50,
      poster: 'https://fanart.tv/fanart/movies/8769/movieposter/christine-53de0248bbaa6.jpg'
    }
  ];

}
