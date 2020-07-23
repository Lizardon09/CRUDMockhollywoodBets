import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { ICountry } from './country';
import { ISportCountryInfo } from '../associations/sportcountryinfo';
import { IStatus } from '../status';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countryurl: string = "https://localhost:44367/api/CRUD/country?";
  private sportcountryurl: string = "https://localhost:44367/api/CRUD/country/PostSportCountry?";
  private sportcountryinfourl: string = "https://localhost:44367/api/CRUD/country/GetAllSportCountryInfo?";
  private sportcountryUpdateurl: string = "https://localhost:44367/api/CRUD/country/UpdateSportCountry?";
  private sportcountryDeleteurl: string = "https://localhost:44367/api/CRUD/country/DeleteSportCountry?";
  private param: string = "id=";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http : HttpClient) { 

  }

  country = [];

  getCountries() : Observable<ICountry[]>{
    return this.http.get<ICountry[]>(this.countryurl)
      .pipe(
        map((data:any)=>{
          this.country = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  getSportCountryInfo() : Observable<ISportCountryInfo[]>{
    return this.http.get<ISportCountryInfo[]>(this.sportcountryinfourl)
      .pipe(
        map((data:any)=>{
          this.country = data;
          return data;
        }),
        catchError(this.handleError)
      );
  }

  mapSportCountry(sportcountry : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to MAP this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.sportcountryurl, sportcountry)
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

  insertCountry(country : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to INSERT this entry?");

    if(answer){
      return this.http.post<IStatus[]>(this.countryurl, country)
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

  updateCountry(country : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.countryurl, country)
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

  updateSportCountry(sportcountry : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to UPDATE this entry?");

    if(answer){
      return this.http.put<IStatus[]>(this.sportcountryUpdateurl, sportcountry)
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

  deleteCountry(country : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.countryurl+this.param+country.id)
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

  deleteSportCountry(sportcountry : any) : Observable<IStatus[]>{

    var answer = confirm("Are you sure you want to DELETE this entry?");

    if(answer){
      return this.http.delete<IStatus[]>(this.sportcountryDeleteurl+this.param+sportcountry.id)
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
