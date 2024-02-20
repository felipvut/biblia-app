import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private activatedRoute : ActivatedRoute
  ) {
    super();
  }
  ngOnInit(): void {
    this.version = this.activatedRoute.snapshot.paramMap.get("version")
    this.book = this.activatedRoute.snapshot.paramMap.get("book")
    this.capitule = this.activatedRoute.snapshot.paramMap.get("capitule")
    this.getVersicules()
  }

  async getLivros() {
    const livros = await axios.get(this.url + "/livros")
    console.log(livros.data)
  }

  async getVersicules() {
    const versicules = await axios.get(`${this.url}/versiculos/${this.version}/${this.book}/${this.capitule}`)
    console.log(versicules)
    if(versicules) {
      this.versicules = versicules.data
    }
  }

}
