import { Injectable, Output ,EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PassdataService {
  @Output() disparadorData : EventEmitter <any> = new EventEmitter();
  constructor() { }
}
