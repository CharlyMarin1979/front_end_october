import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { cineCreacionDTO, cineDTO, cineEditarDTO } from '../cine';
import { CinesService } from '../cines.service';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor(private cinesService: CinesService, private activatedRoute: ActivatedRoute, private router: Router) { }

  modelo: cineDTO;
  errores: String[] = [];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.cinesService.obtenerCineId(params.id).subscribe(cine => {
        this.modelo = cine;
      }, () => this.router.navigate(['/cines']));
    });

  }

  GuardarCambiosCine(cine: cineCreacionDTO){
    this.cinesService.editar(this.modelo.id, cine).subscribe(() => {
      this.router.navigate(['/cines']);
    }, error => this.errores = parsearErroresAPI(error));
  }

}
