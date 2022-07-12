import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PostagemComponent } from './postagem/postagem.component';
import { RodapeComponent } from './rodape/rodape.component';

const routes: Routes = [

  {path:'', redirectTo: '/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'cadastro', component:CadastroComponent},
  {path: 'home', component:HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'rodape', component: RodapeComponent},
  {path: 'postagem', component: PostagemComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
