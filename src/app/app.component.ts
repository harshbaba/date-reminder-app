import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  token: any = ''

  constructor(
    public router: Router
  ){}

  ngOnInit(){
    this.token = localStorage.getItem('token')
    if(this.token != '' && this.token != null){
      this.router.navigate(['/dashboard'])
    }
    else {
      this.router.navigate(['/'])
    }
  }
}
