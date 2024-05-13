import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { LivrosService } from 'src/app/services/livros.service';
import { VersiculosService } from 'src/app/services/versiculos.service';
import { Enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-read-cap',
  templateUrl: './read-cap.component.html',
  styleUrls: ['./read-cap.component.scss']
})
export class ReadCapComponent extends Enviroment implements OnInit {

  loading: boolean = false
  version: any = null
  book: any = null
  capitule: any = null
  versicules: any[] = []
  livros: any = []
  livroPrevius: any = []
  livroNext: any = []
  livro: string = ""
  search: any = null
  capitulos: any = []
  
  constructor(
    protected service: VersiculosService,
    protected livrosService: LivrosService,
    private activatedRoute : ActivatedRoute,
    private router: Router,
  ) {
    super();
    activatedRoute.params.subscribe(val => {
      this.version = val['version']
      this.book = val['book']
      this.capitule = val['capitule']
      this.getCapitules()
      this.getVersicules()
    });
  }
  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
    this.book = this.activatedRoute.snapshot.paramMap.get("book")
    this.capitule = this.activatedRoute.snapshot.paramMap.get("capitule")
  }

  getVersicules() {
    this.loading = true
    this.service.getVersiculos(this.version, this.book, this.capitule)
    .subscribe(result => {
      this.livro = result?.livro
      this.versicules = result?.versicules
      this.getLivros()
      this.loading = false
    })
  }

  getCapitules() {
    this.loading = true
    this.service.getCapitulos(this.book).subscribe(result => {
      this.capitulos = result
      this.capitulos.sort((a: any, b: any) => {
        if(a.ver_capitulo < b.ver_capitulo ) {
          return -1
        }
        if(a.ver_capitulo > b.ver_capitulo ) {
          return 1
        }
        return 0
      })
      this.loading = false
    })
  }

  scrollTop() {
    const page = document.getElementsByClassName('mat-drawer-content')[0]
    page.scrollTop = 0
  }

  getLivros() {
    this.loading = true
    this.livrosService.get().subscribe(result => {
      this.livros = result
      for(let x in this.livros) {
        if(this.livros[x].liv_nome == this.livro) {
          if(this.livros[Number(x) + 1]) {
            this.livroNext = this.livros[Number(x) + 1]
          }
          if(this.livros[Number(x) - 1]) {
            this.livroPrevius = this.livros[Number(x) +- 1]
          }
        }
      }
      this.loading = false
    })
    }

  next(){
    if(!this.capitulos[Number(this.capitule)]) {
      if(this.livroNext?.liv_abreviado) {
        this.router.navigate(['/'+this.version+'/'+ this.livroNext.liv_abreviado +'/1'.toString()])
      } else {
        return
      }
    } else {
      this.router.navigate(['/'+this.version+'/'+this.book+'/'+(Number(this.capitule) + 1).toString()])
    }
  }

  previous(){
    if(!this.capitulos[Number(this.capitule -1) -1]) {
      if(this.livroNext?.liv_abreviado) {
        this.loading = true
        this.service.getCapitulos(this.livroPrevius?.liv_abreviado).subscribe(result => {
          result.sort((a: any, b: any) => {
            if(a.ver_capitulo < b.ver_capitulo ) {
              return -1
            }
            if(a.ver_capitulo > b.ver_capitulo ) {
              return 1
            }
            return 0
          })
          this.loading = false
          this.router.navigate(['/'+this.version+'/' + this.livroPrevius.liv_abreviado +'/' + result[result.length - 1]['ver_capitulo']])
        })
      } else {
        return
      }
    } else {
      this.router.navigate(['/'+this.version+'/'+this.book+'/'+(Number(this.capitule) - 1).toString()])
    }
  }
}
