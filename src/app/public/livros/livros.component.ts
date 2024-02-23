import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import axios from 'axios';
import { Eviroment } from 'src/app/enviroment/enviroment';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent extends Eviroment implements OnInit {

  version: any = null
  constructor(
    private activatedRoute : ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
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
  }
}
