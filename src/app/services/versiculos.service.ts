import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VersiculosService extends BaseService{

  override table = 'versiculos'

  getVersiculos(version: string, book: string, capitule: string) {
    return this.httpClient.get<any>(`${this.url}/${this.table}/${version}/${book}/${capitule}`)
  }

  getCapitulos(book: string) {
    return this.httpClient.get<any>(`${this.url}/capitules/${book}`)
  }
}
