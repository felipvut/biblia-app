import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-versoes',
  templateUrl: './versoes.component.html',
  styleUrls: ['./versoes.component.scss']
})
export class VersoesComponent extends Enviroment implements OnInit{

  ngOnInit(): void {
    this.getVersoes()  
  }

  versoes: any[] = []

  async getVersoes() {
    this.versoes = (await axios.get(this.url + "/versoes")).data
    this.versoes = [this.versoes[0]]
  }
}
