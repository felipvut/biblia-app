import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Eviroment } from 'src/app/enviroment/enviroment';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent extends Eviroment implements OnInit {

  ngOnInit(): void {
    this.getLivros()
  }

  livros: any[] = []
  antigoTestamento: any[] = []
  novoTestamento: any[] = []
  async getLivros() {
    this.livros = (await axios.get(this.url + "/livros")).data
    if(this.livros) {
      for(let x of this.livros) {
        if(x.liv_tes_id == 1) {
          this.antigoTestamento.push(x)
        } else {
          this.novoTestamento.push(x)
        }
      }
    }
    console.log(this.livros)
  }
}
