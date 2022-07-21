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
import { getLocaleCurrencyCode } from '@angular/common';

@Component({
  selector: 'app-postagem',
  templateUrl: './postagem.component.html',
  styleUrls: ['./postagem.component.css'],
})
export class PostagemComponent implements OnInit {
  postagem: Postagem = new Postagem();
  listaPostagens: Postagem[];
  tituloPost: string;
  tituloTema: string;

  postagemEdit: Postagem = new Postagem();
  postagemDeletar: Postagem = new Postagem();
  postagemApagar: Postagem = new Postagem();

  tema: Tema = new Tema();
  listaTemas: Tema[];

  idTema: number;
  idPostagem: number;

  usuario: Usuario = new Usuario();
  idUser = environment.id;

  getTitulo: string;

  key = 'data';
  reverse = true;

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) {}

  ngOnInit() {
    window.scroll(0, 0);

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente!');
      this.router.navigate(['/login']);
    }

    this.getAllTemas();
    this.getAllPostagens();
    this.findAllPostagens();
    this.findByIdPostagem();
  }

  findAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }
  findByIdPostagem() {
    this.postagemService
      .getByIdPostagem(this.idPostagem)
      .subscribe((resp: Postagem) => {
        this.postagem = resp;
      });
  }

  validacaoTitulo(event: any) {
    this.getTitulo = event.target.value;
  }

  getAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp;
    });
  }

  getAllPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp;
    });
  }

  findByIdUsuario() {
    this.authService.getByIdUsuario(this.idUser).subscribe((resp: Usuario) => {
      this.usuario = resp;
    });
  }

  findByTituloPostagem() {
    if (this.tituloPost == '') {
      this.getAllPostagens();
    } else {
      this.postagemService
        .getByTituloPostagem(this.tituloPost)
        .subscribe((resp: Postagem[]) => {
          this.listaPostagens = resp;
        });
    }
  }

  findByTituloTema() {
    if (this.tituloTema == '') {
      this.getAllTemas();
    } else {
      this.temaService
        .getByTituloTema(this.tituloTema)
        .subscribe((resp: Tema[]) => {
          this.listaTemas = resp;
        });
    }
  }

  verificaImagemUsuario(event: Event) {
    const htmlImagem = event.target as HTMLImageElement;
    htmlImagem.src = 'https://i.imgur.com/EVdBYb0.png';
  }

  verificaImagemPostagem(event: Event) {
    const htmlImagem = event.target as HTMLImageElement;
    htmlImagem.src = 'https://i.imgur.com/Ieo8CbJ.png';
  }

  publicar() {
    this.tema.id = this.idTema;
    this.postagem.tema = this.tema;

    this.usuario.id = this.idUser;
    this.postagem.usuario = this.usuario;

    this.postagemService.postPostagem(this.postagem).subscribe(
      (resp: Postagem) => {
        this.postagem = resp;
        this.alertas.showAlertSuccess('Postagem realizada com sucesso!');
        this.postagem = new Postagem();
        this.findAllPostagens();
        this.findByIdPostagem();
      },
      (erro) => {
        if (this.postagem.titulo.length < 10) {
          this.alertas.showAlertDanger(
            'O titulo deve ter no minimo 10 caracteres'
          );
        }

        if (this.postagem.texto.length < 10) {
          this.alertas.showAlertDanger(
            'O texto deve ter no minimo 10 caracteres'
          );
        }

        if (this.idTema == null) {
          this.alertas.showAlertDanger('Por favor, selecione um tema!!');
        }
      }
    );
  }
  atualizar() {
    this.postagemService.putPostagem(this.postagemEdit).subscribe(
      (resp: Postagem) => {
        this.postagemEdit = resp;
        this.postagemEdit = new Postagem();
        this.findAllPostagens();
        this.findByIdPostagem();
        this.alertas.showAlertSuccess('Postagem atualizada com sucesso!');
      },
      (erro) => {
        if (erro.status == 400) {
          this.alertas.showAlertDanger('Campo não foi preenchido corretamente');
          this.findAllPostagens();
        }
      }
    );
  }
  editar(itemId: number) {
    let result = this.listaPostagens.filter((x) => x.id == itemId);
    this.postagemEdit = result[0];
    this.idPostagem = this.postagemEdit.tema.id;
    console.log(this.listaPostagens.filter((x) => x.id == itemId));
  }

  deletar() {
    this.postagemService.deletePostagem(this.postagemApagar.id).subscribe(() => {
      this.alertas.showAlertSuccess('Postagem excluída!');
      this.findAllPostagens();
    });
  }

  apagar(itemId: number) {
    let result = this.listaPostagens.filter((x) => x.id == itemId);
    this.postagemApagar = result[0];
    // this.idTema = itemId.temas.id;
    console.log(this.listaPostagens.filter((x) => x.id == itemId));
  }
}
