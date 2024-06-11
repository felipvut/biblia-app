import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'biblia-app';
  version: any = ''
  constructor(
    protected router: Router,
  ) {}

  goToVersoes() {
    this.version = sessionStorage.getItem('version')
    if(this.version) {
      return this.router.navigate(['/versoes/' + this.version])
    }
    return this.router.navigate(['/versoes/1'])
  }

  goToLivros() {
    this.version = sessionStorage.getItem('version')
    if(this.version) {
      return this.router.navigate(['/livros/' + this.version])
    }
    return this.router.navigate(['/livros/1'])
  }
}
