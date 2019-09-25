import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  // userInfo: any
  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.showInfo = false
    this.authService.userInfo = JSON.parse(localStorage.getItem('userDetails'))
    if(this.authService.userInfo != null){
      this.authService.logedUser = false
      this.authService.logoutuser = true
    }
  }

  userinfo(){
    this.authService.showInfo = !this.authService.showInfo
  }
  

}
