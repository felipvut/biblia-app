import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { Eviroment } from 'src/app/enviroment/enviroment';

@Component({
  selector: 'app-versoes',
  templateUrl: './versoes.component.html',
  styleUrls: ['./versoes.component.scss']
})
export class VersoesComponent extends Eviroment implements OnInit{

  ngOnInit(): void {
    this.getVersoes()  
  }

  versoes: any[] = []

  async getVersoes() {
    this.versoes = (await axios.get(this.url + "/versoes")).data
  }
}
