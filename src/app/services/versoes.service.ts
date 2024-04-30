import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VersoesService extends BaseService {

  override table = 'versoes'
}
