import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';
import { Constants } from 'src/app/config/constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  userDetails: any
  emailId: any
  eventList: any
  constructor(
    public apiService: ApiService,
    public toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails'))
    this.emailId = this.userDetails.emailId
    this.getEventList()
  }

  getEventList(){
    this.apiService.post({emailId: this.emailId}, Constants.APIS.ALL_EVENTS).subscribe(
      success => {
        this.eventList = success.data
      }
    )
  }

  editEvent(editList, viewmode){    
    localStorage.setItem('viewMode', viewmode)
    localStorage.setItem('editList', JSON.stringify(editList))
  }
  
  addEvent(viewmode) {
    localStorage.setItem('viewMode', viewmode)
  }

  deleteEvent(eventdata){
    let postData = {
      emailId: eventdata.emailId,
      _id: eventdata._id
    }
    this.apiService.post(postData, Constants.APIS.DELETE_EVENT).subscribe(
      success => {
        if(Constants.SUCCESS){
          this.getEventList();
          this.toastr.success(success.message, Constants.SUCCESS);
        }
      }
    )

  }

}
