import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { IEvent } from './event';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private eventurl: string = "https://localhost:44367/api/CRUD/event?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) {
  }

  event = [];
  tournament = [];

  getEvents() : Observable<IEvent[]>{
    return this.http.get<IEvent[]>(this.eventurl)
      .pipe(
        map((data:any)=>{
          this.event = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  insertEvent(event : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.eventurl, event)
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

  updateEvent(event : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.eventurl, event)
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

  deleteEvent(event : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.eventurl+this.param+event.id)
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
