import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class LivrosService extends BaseService {

  override table = 'livros'
}
