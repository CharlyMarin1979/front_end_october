import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {Location} from '@angular/common'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRouter: ActivatedRoute) { }

  form: FormGroup;

  formularioOriginal = {
    titulo: '',
    generoId: 0,
    proximosEstrenos: false,
    enCines: false
  };

  generos = 
  [
    {id: 1, nombre: 'Drama'},
    {id: 2, nombre: 'Acción'},
    {id: 3, nombre: 'Terror'}
  ];

  peliculas = 
  [
    {titulo: 'Spider-Man', enCines: false, proximosEstrenos: true, generos: [1,2], poster: 'http://www.appocalypse.co/wp-content/uploads/2019/08/Spider-Man-Far-From-Home-Extended-Cut-Poster.jpg'},
    {titulo: 'Iron-Man', enCines: true, proximosEstrenos: false, generos: [3], poster: 'http://orig02.deviantart.net/4350/f/2010/284/5/f/5f8dd18570404534a75808d112ad0181-d30kkv5.jpg'},
    {titulo: 'CHRISTINE', enCines: false, proximosEstrenos: false, generos: [1,3], poster: 'https://i.pinimg.com/originals/a8/3a/95/a83a959982292652e5866d1a5e52b611.jpg'},
  ]

  peliculasOriginal = this.peliculas;

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe(valores =>{
      //console.log(valores);
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    });
  }

  private leerValoresURL(){
    this.activatedRouter.queryParams.subscribe((params) => {
      var objeto: any = {};

      if (params.titulo){
        objeto.titulo = params.titulo;
      }

      if (params.generoId){
        objeto.generoId = Number(params.generoId);
      }

      if (params.proximosEstrenos){
        objeto.proximosEstrenos = params.generoId.proximosEstrenos;
      }

      if (params.enCines){
        objeto.enCines = params.generoId.enCines;
      }

      this.form.patchValue(objeto);

    });
  }

  private escribirParametrosBusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo){
      queryStrings.push(`titulos=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != 0){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if (valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));

  }

  buscarPeliculas(valores: any){
    console.log(valores);
    if (valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoId !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }

    if (valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if (valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
