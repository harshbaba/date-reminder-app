import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constants } from 'src/app/config/constants';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: any

  constructor(
    private httpClient: HttpClient,
    private toasterService: ToastrService
  ) { }

  handleError(error){
    this.toasterService.error(error, Constants.ERROR)
  }

  post(params, api){
    this.url = `${Constants.API_URL}/${api}/`;
    return this.httpClient.post<any>(this.url, params).pipe(
      tap(
        (success) => {
          return of(success)
        }
      ),
      catchError((err) => {
        this.handleError(err.message)
        return of()
      }),
    );
  }

}
