import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LivrosService } from 'src/app/services/livros.service';
import { Enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styleUrls: ['./livros.component.scss']
})
export class LivrosComponent extends Enviroment implements OnInit {

  livros: any[] = []
  antigoTestamento: any[] = []
  novoTestamento: any[] = []
  version: any = null

  constructor(
    protected service: LivrosService,
    private activatedRoute : ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
    this.getLivros()
  }

  getLivros() {
    this.service.get().subscribe(result => {
      this.livros = result
      if(this.livros) {
        for(let x of this.livros) {
          if(x.liv_tes_id == 1) {
            this.antigoTestamento.push(x)
          } else {
            this.novoTestamento.push(x)
          }
        }
      }
    })
  }
}
