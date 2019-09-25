import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Constants } from 'src/app/config/constants';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { SpinerService } from 'src/app/shared/services/spiner.service';

@Component({
  selector: 'app-add-edit-event',
  templateUrl: './add-edit-event.component.html',
  styleUrls: ['./add-edit-event.component.scss']
})
export class AddEditEventComponent implements OnInit {

  addEditEvent : FormGroup
  userDetails: any = {
    _id: '',
    eventType: '',
    eventName: '',
    eventDate: '',
    emailId: '',
    mobileNo: '',
    isRepeatAnnually: ''
  }
  viewmode: any
  constructor(
    public fb: FormBuilder,
    public apiService: ApiService,
    public toastr: ToastrService,
    public router: Router,
    public spiner: SpinerService
  ) { }

  ngOnInit() {
    this.viewmode = localStorage.getItem('viewMode')
    console.log(this.viewmode)
    if(this.viewmode == 'edit'){
      let editEvent =  JSON.parse(localStorage.getItem('editList'))
      this.userDetails = {
        _id: editEvent._id,
        eventType: editEvent.eventType,
        eventName: editEvent.eventName,
        eventDate: editEvent.eventDate,
        emailId: editEvent.emailId,
        mobileNo: editEvent.mobileNo,
        isRepeatAnnually: editEvent.isRepeatAnnually
      }
      console.log(editEvent)
    }
    if(this.viewmode == 'add'){
      let addEvent = JSON.parse(localStorage.getItem('userDetails'))
      this.userDetails = {
        _id: '',
        eventType: '',
        eventName: '',
        eventDate: '',
        emailId: addEvent.emailId,
        mobileNo: '',
        isRepeatAnnually: ''
      }
      console.log(addEvent)
    }
    // this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    // console.log(this.userDetails)
    this.addEditEvent = this.fb.group({
      _id: [''],
      eventType: ['', Validators.required],
      eventName: ['', Validators.required],
      eventDate: ['', Validators.required],
      emailId: ['', Validators.required],
      mobileNo: ['', [Validators.required, Validators.minLength, Validators.maxLength]],
      isRepeatAnnually: [''],
    })
  }

  isSubmit(data){
    // console.log(data)
    this.spiner.showSpiner()
    
    if(this.viewmode == 'edit'){
      console.log(data)
      this.apiService.post(data, Constants.APIS.EDIT_EVENT).subscribe(
        success => {
          if(Constants.SUCCESS){
            this.spiner.hideSpiner()
            this.toastr.success(success.message, Constants.SUCCESS)
            this.router.navigate(['/dashboard'])
          }
        }
      )
    }
    else if(this.viewmode == 'add'){
      console.log(data)
      delete data._id
      console.log(data)
      this.apiService.post(data, Constants.APIS.CREATE_EVENT).subscribe(
        success => {
          if(Constants.SUCCESS){
            this.spiner.hideSpiner()
            this.toastr.success(success.message, Constants.SUCCESS)
            this.router.navigate(['/dashboard'])
          }
        }
      )
    }
  }
}
