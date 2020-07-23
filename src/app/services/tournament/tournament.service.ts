import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ITournament } from './tournament';
import { ITournamentBettypeInfo } from './tournamentbettypeinfo';
import { ITournamentSCInfo } from './tournamentscinfo';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  private tournamenturl: string = "https://localhost:44367/api/CRUD/tournament?";
  private tournamentSCurl: string = "https://localhost:44367/api/CRUD/tournament/PostTournamentSC?";
  private tournamentBettypeurl: string = "https://localhost:44367/api/CRUD/tournament/PostTournamentBettype?";
  private tournamentBettypeInfourl: string = "https://localhost:44367/api/CRUD/tournament/GetAllTournamentBettypeInfo?";
  private tournamentSCInfourl: string = "https://localhost:44367/api/CRUD/tournament/GetAllTournamentSCInfo?";

  private tournamentBettypeUpdateurl: string = "https://localhost:44367/api/CRUD/tournament/UpdateTournamentBettype?";
  private tournamentBettypeDeleteurl: string = "https://localhost:44367/api/CRUD/tournament/DeleteTournamentBettype?";

  private tournamentSCUpdateurl: string = "https://localhost:44367/api/CRUD/tournament/UpdateTournamentSC?";
  private tournamentSCDeleteurl: string = "https://localhost:44367/api/CRUD/tournament/DeleteTournamentSC?";

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

  getTournamentBettypeInfo() : Observable<ITournamentBettypeInfo[]>{
    return this.http.get<ITournamentBettypeInfo[]>(this.tournamentBettypeInfourl)
      .pipe(
        map((data:any)=>{
          this.tournament = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getTournamentSCInfo() : Observable<ITournamentSCInfo[]>{
    return this.http.get<ITournamentSCInfo[]>(this.tournamentSCInfourl)
      .pipe(
        map((data:any)=>{
          this.tournament = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  mapTournamentSC(tournamentSC : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to MAP this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.tournamentSCurl, tournamentSC)
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

  updateTournamentSC(tournamentsc : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.tournamentSCUpdateurl, tournamentsc)
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

  deleteTournamentSC(tournamentsc : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.tournamentSCDeleteurl+this.param+tournamentsc.id)
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
