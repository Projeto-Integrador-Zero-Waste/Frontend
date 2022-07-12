import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

postagem: Postagem = new Postagem()

  constructor(
    private router: Router,
    private postagemService: PostagemService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }
  }

}