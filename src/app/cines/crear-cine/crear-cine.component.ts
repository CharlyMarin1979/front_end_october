import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-crear-cine',
  templateUrl: './crear-cine.component.html',
  styleUrls: ['./crear-cine.component.css']
})
export class CrearCineComponent {
  errores: string [] = [];

  constructor(private router: Router, private cineService: CinesService) { }

  ngOnInit(): void {
  }

  guardarCambiosCine(cine: cineCreacionDTO){
    this.cineService.crear(cine).subscribe(() => this.router.navigate(['/cines']), (error) => this.errores = parsearErroresAPI(error));
  }

}
