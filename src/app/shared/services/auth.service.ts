import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/config/constants';
// import { userInfo } from 'os';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userDetails: any = ''
  logedUser: boolean = true
  showInfo: boolean = true
  logoutuser: boolean = false

  userInfo: any

  constructor(
    public router: Router,
    public toastr: ToastrService
  ) { }

  logout(){
      this.showInfo = false
      this.logedUser = true
      this.logoutuser = false
      this.userDetails = ''
      this.userInfo = ''
      localStorage.removeItem('token')
      localStorage.removeItem('userDetails')
      this.toastr.success('Logout Successfully', Constants.SUCCESS)
      this.router.navigate(['/'])
  }
}
