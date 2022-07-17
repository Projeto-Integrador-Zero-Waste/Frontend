import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../model/Usuario';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  usuario: Usuario = new Usuario
  confirmSenha: string
  tipoUsuario: string

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmarSenha(event: any) {
    this.confirmSenha = event.target.value
  }


  tipoUser(event: any) {
    this.tipoUsuario = event.target.value
  }

  cadastrar() {
    this.usuario.tipo = this.tipoUsuario

    if (this.usuario.senha != this.confirmSenha) {
      this.alertas.showAlertDanger('Senhas diferentes!')
    } else {
      this.authService.cadastrar(this.usuario).subscribe((resp: Usuario) => {
        this.usuario = resp
        this.router.navigate(['/login'])
        this.alertas.showAlertSuccess('Usuário cadastrado com sucesso!!')
      })

    }

    if(this.usuario.nome == null){
      this.alertas.showAlertDanger('O atributo nome é obrigatório')
    }

    if(this.usuario.senha.length < 8){
      this.alertas.showAlertDanger('A senha deve ter no mínimo 8 caracteres')
    }

    if(this.tipoUsuario == null){
      this.alertas.showAlertDanger('Selecione um tipo!!')
    }

    




  }
}
