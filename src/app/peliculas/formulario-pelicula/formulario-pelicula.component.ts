import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultipleSelectorModel } from 'src/app/utilidades/selector-multiple/MultipleSelectorModel';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

 @Input()
 errores: string[] = [];


  @Input()
  modelo: PeliculaDTO;

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  generosNoSeleccionados : MultipleSelectorModel[];

  generosSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultipleSelectorModel[];

  cinesSeleccionados: MultipleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', {validators: [Validators.required]}],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIds: '',
      cinesIds: '',
      actores: ''
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }

  }

  guardarPelicula(){
    console.log(this.generosSeleccionados);
    const generosIds = this.generosSeleccionados.map(val => val.llave);
    this.form.get('generosIds').setValue(generosIds);

    //selección de cines
    const cinesIds = this.cinesSeleccionados.map(val => val.llave);
    this.form.get('cinesIds').setValue(cinesIds);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}

    });

    this.form.get('actores').setValue(actores);

    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }

  changeMarkdown(resumen){
    this.form.get('resumen').setValue(resumen);
  }

}
