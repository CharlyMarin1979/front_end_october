import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { credencialesUsuario } from '../seguridad';

@Component({
  selector: 'app-formulatio-autenticacion',
  templateUrl: './formulatio-autenticacion.component.html',
  styleUrls: ['./formulatio-autenticacion.component.css']
})
export class FormulatioAutenticacionComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;

  @Input()
  errores: string[] = [];

  @Input()
  accion: string;

  @Output()
  onSubmit: EventEmitter<credencialesUsuario> = new EventEmitter<credencialesUsuario>();


  ngOnInit(): void {

    this.form = this. formBuilder.group({
      email: ['', {validators: [Validators.required, Validators.email]}],
      password: ['', {validators: [Validators.required]}]
    });
  }

  obtenerMensajerErrorEmail(){
    var campo = this.form.get('email');
    if (campo.hasError('required')){
      return 'El campo Email es requerido';
    }
    if(campo.hasError('email')){
      return 'El Email no es válido';
    }

    return '';
  }

}
