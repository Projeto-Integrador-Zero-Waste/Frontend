import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './cadastro/cadastro.component';
import { TemaDeleteComponent } from './delete/tema-delete/tema-delete.component';
import { PostagemEditComponent } from './edit/postagem-edit/postagem-edit.component';
import { TemaEditComponent } from './edit/tema-edit/tema-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './menu/menu.component';
import { PostagemComponent } from './postagem/postagem.component';
import { RodapeComponent } from './rodape/rodape.component';
import { TemaComponent } from './tema/tema.component';

const routes: Routes = [

  {path:'', redirectTo: '/login',pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'cadastro', component:CadastroComponent},
  {path: 'home', component:HomeComponent},
  {path: 'menu', component: MenuComponent},
  {path: 'rodape', component: RodapeComponent},
  {path: 'postagem', component: PostagemComponent},
  {path: 'tema', component: TemaComponent},
  {path:'tema-edit/:id', component: TemaEditComponent},
  {path: 'tema-delete/:id', component: TemaDeleteComponent},
  {path:'postagem-edit/:id',component:PostagemEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
