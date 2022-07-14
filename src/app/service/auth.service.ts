import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Usuario } from '../model/Usuario';
import { UsuarioLogin } from '../model/UsuarioLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlLocal = 'http://localhost:8080'
  private urlHeroku = 'https://zerowastee.herokuapp.com'
  

  constructor(
    private http: HttpClient

  ) { }

  entrar(usuarioLogin: UsuarioLogin): Observable<UsuarioLogin> {
    return this.http.post<UsuarioLogin>(this.urlHeroku + '/usuarios/logar', usuarioLogin)
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlHeroku + '/usuarios/cadastrar', usuario)

  }
  atualizar(usuario: Usuario): Observable<Usuario>{
    return this.http.put<Usuario>(this.urlHeroku + '/usuarios/atualizar', usuario)
  }

  getByIdUsuario(id: number): Observable<Usuario>{
    return this.http.get<Usuario>(this.urlHeroku + `/usuarios/${id}`)
    }

  logado(){
    let ok: boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }

}
