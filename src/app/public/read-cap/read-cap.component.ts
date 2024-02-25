import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { Eviroment } from 'src/app/enviroment/enviroment';

@Component({
  selector: 'app-read-cap',
  templateUrl: './read-cap.component.html',
  styleUrls: ['./read-cap.component.scss']
})
export class ReadCapComponent extends Eviroment implements OnInit {

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
    private activatedRoute : ActivatedRoute,
    private router: Router,
  ) {
    super();
    activatedRoute.params.subscribe(val => {
      this.version = val['version']
      this.book = val['book']
      this.capitule = val['capitule']
      this.getLivros()
      this.getCapitules()
      this.getVersicules()
    });
  }
  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
    this.book = this.activatedRoute.snapshot.paramMap.get("book")
    this.capitule = this.activatedRoute.snapshot.paramMap.get("capitule")
    this.getVersicules()
    this.getCapitules()
  }

  async getVersicules() {
    const versicules = await axios.get(`${this.url}/versiculos/${this.version}/${this.book}/${this.capitule}`)
    if(versicules) {
      this.livro = versicules.data.livro
      this.versicules = versicules.data.versicules
      this.getLivros()
    }
  }

  async getCapitules() {
    const capitulos = await axios.get(`${this.url}/capitules/${this.book}`)
    if(capitulos) {
      this.capitulos = capitulos.data
    }
  }

  async getLivros() {
    this.livros = await axios.get(this.url + "/livros")
    this.livros = this.livros.data
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

  async previous(){
    if(!this.capitulos[Number(this.capitule -1) -1]) {
      if(this.livroNext?.liv_abreviado) {
        let capitulesPrevius = (await axios.get(`${this.url}/capitules/${this.livroPrevius?.liv_abreviado}`)).data
        this.router.navigate(['/'+this.version+'/' + this.livroPrevius.liv_abreviado +'/' + capitulesPrevius[capitulesPrevius.length - 1]['ver_capitulo']])
      } else {
        return
      }
    } else {
      this.router.navigate(['/'+this.version+'/'+this.book+'/'+(Number(this.capitule) - 1).toString()])
    }
  }
}
