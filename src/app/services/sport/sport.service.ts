import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ISport } from './sport';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class SportService {

  private sporturl: string = "https://localhost:44367/api/CRUD/sport?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {
  }

  sport = [];

  getSports() : Observable<ISport[]>{
    return this.http.get<ISport[]>(this.sporturl)
      .pipe(
        map((data:any)=>{
          this.sport = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  insertSport(sport : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.sporturl, sport)
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

  updateSport(sport : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.sporturl, sport)
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

  deleteSport(sport : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.sporturl+this.param+sport.id)
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
