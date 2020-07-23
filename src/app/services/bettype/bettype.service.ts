import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IBettype } from './bettype';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class BettypeService {

  private bettypeurl: string = "https://localhost:44367/api/CRUD/bettype?";
  private tournamentBettypeurl: string = "https://localhost:44367/api/CRUD/bettype/PostTournamentBettype?";
  private marketBettypeurl: string = "https://localhost:44367/api/CRUD/bettype/PostMarketBettype?";

  private tournamentBettypeUpdateurl: string = "https://localhost:44367/api/CRUD/tournament/UpdateTournamentBettype?";
  private tournamentBettypeDeleteurl: string = "https://localhost:44367/api/CRUD/tournament/DeleteTournamentBettype?";

  private marketBettypeUpdateurl: string = "https://localhost:44367/api/CRUD/market/UpdateMarketBettype?";
  private marketBettypeDeleteurl: string = "https://localhost:44367/api/CRUD/market/DeleteMarketBettype?";

  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {
  }

  bettype = [];

  getBettypes() : Observable<IBettype[]>{
    return this.http.get<IBettype[]>(this.bettypeurl)
      .pipe(
        map((data:any)=>{
          this.bettype = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  mapTournamentBettype(tournamentBettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to MAP this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.tournamentBettypeurl, tournamentBettype)
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

  insertBettype(bettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.bettypeurl, bettype)
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

  updateBettype(bettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.bettypeurl, bettype)
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

  updateTournamentBettype(tournamentbettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.tournamentBettypeUpdateurl, tournamentbettype)
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

  deleteBettype(bettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.bettypeurl+this.param+bettype.id)
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

  deleteTournamentBettype(tournamentbettype : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.tournamentBettypeDeleteurl+this.param+tournamentbettype.id)
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

  handleError(error: HttpErrorResponse){
    console.log(error);
    return of([]);
  }

  handleCrudError(error: HttpErrorResponse){
    console.log(error);
    return of([{status:"Error"}]);
  }

}
