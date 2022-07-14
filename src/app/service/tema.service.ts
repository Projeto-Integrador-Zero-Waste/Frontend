import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod'
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private urlLocal = 'http://localhost:8080'
  private urlHeroku = 'https://zerowastee.herokuapp.com'

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]> {
    return this.http.get<Tema[]>(this.urlHeroku + '/temas', this.token)
  }

  getByIdTema(id: number): Observable<Tema> {
    return this.http.get<Tema>(this.urlHeroku + `/temas/${id}`, this.token)
  }

  getByTituloTema(titulo: string): Observable<Tema[]>{
    return this.http.get<Tema[]>(this.urlHeroku + `/temas/titulo/${titulo}`, this.token)
  }

  postTema(tema: Tema): Observable<Tema> {
    return this.http.post<Tema>(this.urlHeroku + '/temas', tema, this.token)
  }

  putTema(tema: Tema): Observable<Tema> {
    return this.http.put<Tema>(this.urlHeroku + '/temas', tema, this.token)
  }

  deleteTema(id: number) {
    return this.http.delete(this.urlHeroku + `/temas/${id}`, this.token)
  }

}