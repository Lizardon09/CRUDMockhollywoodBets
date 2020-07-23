import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IMarket } from './market';
import { IMarketBettypeInfo } from './marketbettypeinfo';
import { IOddInfo } from './oddinfo';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private marketurl: string = "https://localhost:44367/api/CRUD/market?";

  private marketBettypeurl: string = "https://localhost:44367/api/CRUD/market/PostMarketBettype?";
  private marketBettypeInfourl: string = "https://localhost:44367/api/CRUD/market/GetAllMarketBettypeInfo?";

  private marketBettypeUpdateurl: string = "https://localhost:44367/api/CRUD/market/UpdateMarketBettype?";
  private marketBettypeDeleteurl: string = "https://localhost:44367/api/CRUD/market/DeleteMarketBettype?";

  private oddsurl: string = "https://localhost:44367/api/CRUD/market/PostOdd?";
  private oddsinfourl: string = "https://localhost:44367/api/CRUD/market/GetAllOddInfo?";

  private oddsUpdateurl: string = "https://localhost:44367/api/CRUD/market/UpdateOdd?";
  private oddsDeleteurl: string = "https://localhost:44367/api/CRUD/market/DeleteOdd?";

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

  getOddInfo() : Observable<IOddInfo[]>{
    return this.http.get<IOddInfo[]>(this.oddsinfourl)
      .pipe(
        map((data:any)=>{
          this.market = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getMarketBettypeInfo() : Observable<IMarketBettypeInfo[]>{
    return this.http.get<IMarketBettypeInfo[]>(this.marketBettypeInfourl)
      .pipe(
        map((data:any)=>{
          this.market = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  mapMarketBettype(marketBettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to MAP this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.marketBettypeurl, marketBettype)
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

  insertOdd(odd : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.oddsurl, odd)
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

  updateMarketBettype(marketbettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.marketBettypeUpdateurl, marketbettype)
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

  updateOdd(odd : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.oddsUpdateurl, odd)
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

  deleteMarketBettype(marketbettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.marketBettypeDeleteurl+this.param+marketbettype.id)
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

  deleteOdd(odd : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.oddsDeleteurl+this.param+odd.id)
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
