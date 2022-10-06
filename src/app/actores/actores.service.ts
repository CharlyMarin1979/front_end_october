import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearfecha } from '../utilidades/utilidades';
import { actorCreacionDTO, actorDTO, actorPeliculaDTO } from './actor';

@Injectable({
  providedIn: 'root'
})
export class ActoresService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + "/actores";

  public crear(actor: actorCreacionDTO){
    console.log(" Actor en servicio actores ->");
    console.log(actor);
    const formData = this.construirFormData(actor);
    return this.http.post(this.apiURL, formData);
  }

  private construirFormData(actor: actorCreacionDTO): FormData{
    const formData = new FormData();
    formData.append('nombre', actor.nombre);
    if (actor.biografia){
      formData.append('biografia', actor.biografia);
    }
    
    if(actor.fechaNacimiento){
      formData.append('fechaNacimiento', formatearfecha(actor.fechaNacimiento));
    }

    if (actor.foto){
      formData.append('foto', actor.foto);
    }
    console.log(formData);
    return formData;

  }

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<actorDTO[]>(this.apiURL, {observe: 'response', params});

  }

  public borrar(id: number){
    console.log(id);
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public editar(actor: actorCreacionDTO, id: number){
    console.log(actor);
    const formData = this.construirFormData(actor);
    return this.http.put<actorCreacionDTO>(`${this.apiURL}/${id}`, formData);
  }

  public obtenerPorId(id: number): Observable<actorDTO>{
    return this.http.get<actorDTO>(`${this.apiURL}/${id}`);
  }

  public obtenerPorNombre(nombre: string): Observable<actorPeliculaDTO[]>{
    console.log("NOmbre del actor -> " + nombre);
    const headers = new HttpHeaders('Content-Type: application/json');
    console.log("Headers -> " + headers);
    return this.http.post<actorPeliculaDTO[]>(`${this.apiURL}/buscarPorNombre`, JSON.stringify(nombre), {headers});
  }
}
