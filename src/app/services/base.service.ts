import { Injectable } from '@angular/core';
import { Enviroment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class BaseService extends Enviroment {

  table = ""
  override url = (new Enviroment()).url

  constructor(
    public httpClient: HttpClient
  ) {
    super();
  }

  get() {
    return this.httpClient.get<any>(`${this.url}/${this.table}`)
  }
}
