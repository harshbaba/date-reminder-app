import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/config/constants';
import { SpinerService } from 'src/app/shared/services/spiner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  registrationForm: FormGroup
  postData: any = {
    firstName: '',
    lastName: '',
    emailId: '',
    mobileNo: '',
    password: '',
  }

  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public toasterService: ToastrService,
    public spiner: SpinerService,
    public router: Router
  ) { }

  ngOnInit() {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    })
  }

  isSubmit(data){
    this.spiner.showSpiner()
    if(!this.registrationForm.valid || data.password != data.confirmPassword){
      this.spiner.hideSpiner()
      return false
    }
    
    this.postData = {
      firstName: data.firstName,
      lastName: data.lastName,
      emailId: data.emailId,
      mobileNo: data.mobileNo,
      password: data.password
    }
    this.apiService.post(this.postData, Constants.APIS.REGISTER).subscribe(
      success => {
        if(success.success){
          this.toasterService.success(success.message, Constants.SUCCESS);
          this.spiner.hideSpiner()
          this.router.navigate(['/'])
        }
      },
      error => {
        console.log(error)
      }
    )
  }

}
