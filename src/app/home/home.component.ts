import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { AlertasService } from '../service/alertas.service';
import { PostagemService } from '../service/postagem.service';

class noticia {
  imagem: string
  titulo: string
  descricao: string
  linkExterno: string

  constructor(
    imagem: string,
    titulo: string,
    descricao: string,
    linkExterno: string,
  ) {
    this.imagem = imagem
    this.titulo = titulo
    this.descricao = descricao
    this.linkExterno = linkExterno
  }
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  postagem: Postagem = new Postagem()
  noticias: noticia[] = []

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private alertas: AlertasService
    ) { }

  ngOnInit() {

    if (environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }
    this.noticias.push(new noticia('https://i.imgur.com/7zsnpaU.png', 'Fome e Agricultura sustentável', 'Erradicar a fome, alcançar a segurança alimentar e melhorar a nutrição.', 'https://brasil.un.org/pt-br/sdgs'))

    this.noticias.push(new noticia('https://i.imgur.com/CC30xNX.png', 'Desperdício de alimentos', '18 de junho é o Dia da Gastronomia Sustentável, uma celebração internacional da culinária local.', 'https://www.oxfam.org.br/noticias/fome-avanca-no-brasil-em-2022-e-atinge-331-milhoes-de-pessoas/'))

    this.noticias.push(new noticia('https://i.imgur.com/UpFRzB7.png', 'Desperdício de alimentos', 'A escalada da fome no Brasil está expressa em pratos cada vez mais vazios.', 'https://www.unep.org/pt-br/noticias-e-reportagens/reportagem/como-o-desperdicio-de-alimentos-esta-destruindo-o-planeta'))
  }
}