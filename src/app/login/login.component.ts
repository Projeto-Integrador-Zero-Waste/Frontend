import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { UsuarioLogin } from '../model/UsuarioLogin';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuarioLogin: UsuarioLogin = new UsuarioLogin()


  constructor(
    private auth: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }
  entrar() {
    this.auth.entrar(this.usuarioLogin).subscribe((resp: UsuarioLogin) => {
      this.usuarioLogin = resp

      environment.token = this.usuarioLogin.token
      environment.nome = this.usuarioLogin.nome
      environment.foto = this.usuarioLogin.foto
      environment.id = this.usuarioLogin.id
      environment.tipo = this.usuarioLogin.tipo

      console.log(environment.token)

      console.log(environment.nome)

      console.log(environment.foto)

      console.log(environment.id)

      


      this.usuarioLogin.foto

      this.router.navigate(['/home'])
    }, erro => {
      if (erro.status == 401) {
        this.alertas.showAlertDanger('Usuário ou senha estão incorretos!')
      }

      if (erro.status == 500) {
        this.alertas.showAlertDanger('Erro no servidor, tente novamente')
      }

    })
  }

}
