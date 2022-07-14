import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
  tema: Tema = new Tema()
  listaTemas: Tema[]

  constructor(
    private temaService: TemaService,
    private router: Router,
    
  ) { }

  ngOnInit() {
    if (environment.token == '') {
      alert('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.findAllTemas()
  }

  findAllTemas() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrarTema() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      alert('Tema cadastrado com sucesso!')
      this.findAllTemas()
      this.tema = new Tema()
    }, erro => {

      if (this.tema.titulo.length < 5) {
        alert('O titulo deve ter no minimo 5 caracteres')
      }

   

    })
  }

}