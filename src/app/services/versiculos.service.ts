import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VersiculosService extends BaseService{

  override table = 'versiculos'
}
