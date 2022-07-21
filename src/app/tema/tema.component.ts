import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]

  idTema: number;

  temaEdit: Tema = new Tema();
  temaApagar: Tema = new Tema();


  constructor(
    private temaService: TemaService,
    private router: Router,
    private alertas: AlertasService

  ) { }

  ngOnInit() {
      if (environment.token == '') {
        this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
        this.router.navigate(['/login'])
      }

    this.findAllTemas()
    this.findByIdTema()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrarTema() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    }, erro => {

      if (this.tema.titulo.length < 5) {
        this.alertas.showAlertInfo('O titulo deve ter no minimo 5 caracteres')
      }
    })
  }


  findByIdTema() {
    this.temaService
      .getByIdTema(this.idTema)
      .subscribe((resp: Tema) => {
        this.tema = resp;
      });
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp;
    });
  }



  atualizar() {
    this.temaService
      .putTema(this.temaEdit)
      .subscribe((resp: Tema) => {
        this.temaEdit = resp;
        this.temaEdit = new Tema();
        this.alertas.showAlertSuccess('Tema atualizado com sucesso!')
      },
      (erro) => {
        if (erro.status == 400) {
          this.alertas.showAlertDanger('Campo não foi preenchido corretamente')
          this.findAllTema();
        }
      });
  }

  deletar() {
    this.temaService
      .deleteTema(this.temaApagar.id)
      .subscribe(() => {
        this.alertas.showAlertSuccess('Tema excluído!');
        this.findAllTema();
      });
  }

  editar(itemId: number) {
    let result = this.listaTemas.filter((x) => x.id == itemId);
    this.temaEdit = result[0];
    this.idTema = this.temaEdit.id;
    console.log(this.listaTemas.filter((x) => x.id == itemId));
  }

  apagar(itemId: number) {
    let result = this.listaTemas.filter((x) => x.id == itemId);
    this.temaApagar = result[0];
    // this.idTema = itemId.temas.id;
    console.log(this.listaTemas.filter((x) => x.id == itemId));
  }
}
