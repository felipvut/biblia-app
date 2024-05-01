import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { VersoesService } from 'src/app/services/versoes.service';
import { Enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-versoes',
  templateUrl: './versoes.component.html',
  styleUrls: ['./versoes.component.scss']
})
export class VersoesComponent extends Enviroment implements OnInit{

  constructor(
    protected service: VersoesService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getVersoes()  
  }

  versoes: any[] = []

  getVersoes() {
    this.service.get().subscribe(result => {
      this.versoes = [
        result[0]
      ]
    })
  }
}
