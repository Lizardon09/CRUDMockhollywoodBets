import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ITournament } from './tournament';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamenturl: string = "https://localhost:44367/api/CRUD/tournament?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {
  }

  tournament = [];

  getTournaments() : Observable<ITournament[]>{
    return this.http.get<ITournament[]>(this.tournamenturl)
      .pipe(
        map((data:any)=>{
          this.tournament = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  insertTournament(tournament : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.tournamenturl, tournament)
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

  updateTournament(tournament : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.tournamenturl, tournament)
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

  deleteTournament(tournament : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.tournamenturl+this.param+tournament.id)
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
