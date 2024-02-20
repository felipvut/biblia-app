import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReadCapComponent } from './public/read-cap/read-cap.component';

const routes: Routes = [
  {path: ":version/:book/:capitule", component: ReadCapComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
