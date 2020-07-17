import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IMarket } from './market';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private marketurl: string = "https://localhost:44367/api/CRUD/market?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {
  }

  market = [];

  getMarkets() : Observable<IMarket[]>{
    return this.http.get<IMarket[]>(this.marketurl)
      .pipe(
        map((data:any)=>{
          this.market = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  insertMarket(market : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.marketurl, market)
      .pipe(
        map((data:any)=>{
          return data;
        }),
        catchError(this.handleCrudError)
      );
    }
    else{
      return of([{status:"Cancelled"}]);
    }
  }

  updateBettype(market : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.marketurl, market)
      .pipe(
        map((data:any)=>{
          return data;
        }),
        catchError(this.handleCrudError)
      );
    }
    else{
      return of([{status:"Cancelled"}]);
    }
  }

  deleteMarket(market : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.marketurl+this.param+market.id)
      .pipe(
        map((data:any)=>{
          return data;
        }),
        catchError(this.handleCrudError)
      );
    }
    else{
      return of([{status:"Cancelled"}]);
    }
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
