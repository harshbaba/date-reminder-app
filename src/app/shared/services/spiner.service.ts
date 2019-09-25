import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpinerService {
  show: boolean = false
  constructor() { }
  
  showSpiner() {
    this.show = true
  }

  hideSpiner(){
    this.show = false
  }
}
