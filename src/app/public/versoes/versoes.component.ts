import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { VersoesService } from 'src/app/services/versoes.service';
import { Enviroment } from 'src/enviroment/enviroment';

@Component({
  selector: 'app-versoes',
  templateUrl: './versoes.component.html',
  styleUrls: ['./versoes.component.scss']
})
export class VersoesComponent extends Enviroment implements OnInit{

  loading: boolean = false
  constructor(
    protected service: VersoesService,
    protected router: Router,
  ) {
    super();
  }

  ngOnInit(): void {
    this.getVersoes()  
  }

  versoes: any[] = []

  goToVersion(version: string) {
    sessionStorage.setItem('version', version)
    this.router.navigate(['/livros/' + version])
  }

  getVersoes() {
    this.loading = true
    this.service.get().subscribe(result => {
      this.versoes = result
      this.loading = false
    })
  }
}
