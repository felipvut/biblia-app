import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadCapComponent } from './public/read-cap/read-cap.component';
import { LivrosComponent } from './public/livros/livros.component';
import { VersoesComponent } from './public/versoes/versoes.component';

const routes: Routes = [
  {path: ":version/:book/:capitule", component: ReadCapComponent},
  {path: "livros/:version", component: LivrosComponent},
  {path: "versoes/:version", component: VersoesComponent},
  {path: "**", redirectTo: "livros/1"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
