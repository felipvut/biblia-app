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
  livros: any[] = []
  constructor(
    private activatedRoute : ActivatedRoute,
    private router: Router,
    route: ActivatedRoute
  ) {
    super();
    route.params.subscribe(val => {
      this.getVersicules()
    });
  }
  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
    this.book = this.activatedRoute.snapshot.paramMap.get("book")
    this.capitule = this.activatedRoute.snapshot.paramMap.get("capitule")
    this.getVersicules()
    this.getLivros()
  }

  async getLivros() {
    this.livros = (await axios.get(this.url + "/livros")).data
    console.log(this.livros)
  }

  async getVersicules() {
    const versicules = await axios.get(`${this.url}/versiculos/${this.version}/${this.book}/${this.capitule}`)
    if(versicules) {
      this.versicules = versicules.data
    }
  }

  next(){
    // this.router.navigate(['/'+this.version+'/'+this.book+'/'+(Number(this.capitule) + 1).toString()])
  }

  previous(){
    // this.router.navigate(['/'+this.version+'/'+this.book+'/'+(Number(this.capitule) - 1).toString()])
  }
}
