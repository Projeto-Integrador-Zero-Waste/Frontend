import { AuthService } from './../service/auth.service';
import { Usuario } from './../model/Usuario';
import { Tema } from './../model/Tema';
import { TemaService } from './../service/tema.service';
import { PostagemService } from './../service/postagem.service';
import { Postagem } from './../model/Postagem';
import { Router } from '@angular/router';
import { environment } from './../../environments/environment.prod';
import { Component, OnInit } from '@angular/core';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css']
})
export class PostagemComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]
  tituloPost: string
  tituloTema: string

  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number
  // nomeTema: string

  usuario: Usuario = new Usuario()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente!')
      this.router.navigate(['/login'])
    }

    this.getAllTemas()
    this.getAllPostagens()

  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens()
    } else {
      this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
        this.listaPostagens = resp
      })
    }
  }

  findByTituloTema() {
    if (this.tituloTema == '') {
      this.getAllTemas()
    } else {
      this.temaService.getByTituloTema(this.tituloTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }



  publicar() {
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.usuario.id = this.idUser
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()

    }, erro => {

      if (this.postagem.titulo.length < 10) {
        this.alertas.showAlertInfo('O titulo deve ter no minimo 10 caracteres')
      }

      if (this.postagem.texto.length < 10) {
        this.alertas.showAlertInfo('O texto deve ter no minimo 10 caracteres')
      }

      if (this.postagem.foto.length < 10) {
        this.alertas.showAlertInfo('A foto deve ter no minimo 10 caracteres')
      }

    })
  }



}