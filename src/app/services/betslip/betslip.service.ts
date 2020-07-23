import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IBetSlip } from './betslip';
import { IBetInfo } from './betinfo';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class BetslipService {

  private beturl: string = "https://localhost:44367/api/CRUD/bet/GetBets?";
  private betslipurl: string = "https://localhost:44367/api/CRUD/bet/GetBetSlip?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {

  }

  betslip = [];

  getBetSlips() : Observable<IBetSlip[]>{
    return this.http.get<IBetSlip[]>(this.betslipurl)
      .pipe(
        map((data:any)=>{
          this.betslip = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getBetsByBetSlip(id : number) : Observable<IBetInfo[]>{
    return this.http.get<IBetInfo[]>(this.beturl+this.param+id)
      .pipe(
        map((data:any)=>{
          this.betslip = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  
  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }

  handleCrudError(error: HttpErrorResponse){
    console.log(error);
    return of([{status:"Error"}]);
  }

}
