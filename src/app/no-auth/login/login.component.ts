import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr'; 
import { ApiService } from 'src/app/shared/services/api.service';
import { Constants } from 'src/app/config/constants';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SpinerService } from 'src/app/shared/services/spiner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup
  
  constructor(
    public fb: FormBuilder,
    public toastr: ToastrService,
    public apiService: ApiService,
    public router: Router,
    public authService: AuthService,
    public spiner: SpinerService
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  isSubmit(data){
    this.spiner.showSpiner()
    this.apiService.post(data, Constants.APIS.LOGIN).subscribe(
      success => {
        console.log(success)
        localStorage.setItem('userDetails', JSON.stringify(success.userDetails))
        localStorage.setItem('token', success.userDetails.token)
        this.authService.userDetails = success.userDetails
        this.authService.logedUser = false
        this.authService.logoutuser = true
        this.toastr.success('Login Successfully', Constants.SUCCESS)
        this.spiner.hideSpiner()
        this.router.navigate(['/dashboard'])
        
      },
      error => {
        // console.log(error)
      }
    )
  }

}
