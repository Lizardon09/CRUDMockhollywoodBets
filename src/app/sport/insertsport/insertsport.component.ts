import { Component, OnInit } from '@angular/core';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';
import { ISportCountry } from '../../services/associations/sportcountry';
import { ISportCountryInfo } from '../../services/associations/sportcountryinfo';

@Component({
  selector: 'app-insertsport',
  templateUrl: './insertsport.component.html',
  styleUrls: ['./insertsport.component.css']
})
export class InsertsportComponent implements OnInit {

  sports : ISport[] = [];
  countries : ICountry[] = [];
  sportcountryinfos : ISportCountryInfo[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  disableassociationbutton = true;
  namefield : string = "";
  logofield : string = "";
  mapsport : ISport = {id:0,name:"Select Sport",logo:""};
  mapcountry : ICountry = {id:0,name:"Select Country",logo:""};

  constructor(private sportservice : SportService, private countryservice : CountryService) { }

  ngOnInit(): void {
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.countryservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  disableButton(){
    if(this.namefield && this.logofield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  disableAssociationButton(){
    if(this.mapsport.id>0 && this.mapcountry.id>0){
      this.disableassociationbutton = false;
    }
    else{
      this.disableassociationbutton = true;
    }
  }

  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  onLogoKey(event){
    this.logofield = event.target.value;
    this.disableButton();
  }

  onSportKey(sport){
    this.mapsport = sport;
    this.disableAssociationButton();
  }

  onCountryKey(country){
    this.mapcountry = country;
    this.disableAssociationButton();
  }

  startInsert(){
    this.insertSport({id:0,name:this.namefield,logo:this.logofield});
  }

  startMap(){
    this.mapSportCountry({id:0,sportid:this.mapsport.id,countryid:this.mapcountry.id});
  }

  mapSportCountry(sportcountry : ISportCountry){
    this.sportservice.mapSportCountry(sportcountry)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  insertSport(sport : ISport){
    this.sportservice.insertSport(sport)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  insertResultStatus(data : any){
    if(data.status=="Success"){
      this.successfulinsert = true;
      this.unsuccessfullinsert = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfullinsert = true;
      this.successfulinsert = false;
    }
    this.namefield = "";
    this.logofield = "";
    this.mapsport = {id:0,name:"Select Sport",logo:""};
    this.mapcountry = {id:0,name:"Select Country",logo:""};
    this.disableButton();
    this.disableAssociationButton();
    window.scrollTo(0,0);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.countryservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  closeSuccess(){
    this.successfulinsert = false;
    this.unsuccessfullinsert = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
