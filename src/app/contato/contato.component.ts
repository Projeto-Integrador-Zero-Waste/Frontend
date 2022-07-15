import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { AlertasService } from '../service/alertas.service';

@Component({
  selector: 'app-contato',
  templateUrl: './contato.component.html',
  styleUrls: ['./contato.component.css']
})
export class ContatoComponent implements OnInit {

  constructor(
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)

    if (environment.token == '') {
    this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente')
      this.router.navigate(['/login'])
    }
  }

  enviar(){
    this.alertas.showAlertSuccess('Mensagem enviada!')
    this.router.navigate(['/home'])
  }
}
