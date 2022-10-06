import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  apiURL = environment.apiURL + '/cuentas'; 
  private readonly llaveToken = 'token';
  private readonly llaveExpiracion = 'token-expiracion';

  estaLogueado(): boolean{
    const token = localStorage.getItem(this.llaveToken);
    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const fechaExpiracion = new Date(expiracion);

    if(!token){
      return false;
    }

    if(fechaExpiracion <= new Date()){
      this.logout();
      return false;
    }
    return true;

  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);

  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return '';
    }
    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }



  obtenerRol(): string{
    return 'admin';
  }

  registrar(cred: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/crear', cred);
  }

  login(cred: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiURL + '/login', cred);
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }


}
