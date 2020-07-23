import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';
import { ISportCountry } from '../../services/associations/sportcountry';
import { ISportCountryInfo } from '../../services/associations/sportcountryinfo';

@Component({
  selector: 'app-insertcountry',
  templateUrl: './insertcountry.component.html',
  styleUrls: ['./insertcountry.component.css']
})
export class InsertcountryComponent implements OnInit {

  countries : ICountry[] = [];
  sports : ISport[] = [];
  sportcountryinfos : ISportCountryInfo[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  disableassociationbutton = true;
  namefield : string = "";
  logofield : string = "";
  mapsport : ISport = {id:0,name:"Select Sport",logo:""};
  mapcountry : ICountry = {id:0,name:"Select Country",logo:""};

  constructor(private countryservice : CountryService, private sportservice : SportService) { }

  ngOnInit(): void {
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.sportservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  disableButton(){
    if(!this.namefield || !this.logofield){
      this.disablebutton = true;
    }
    else{
      this.disablebutton = false;
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
    this.insertCountry({id:0,name:this.namefield,logo:this.logofield});
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

  insertCountry(country : ICountry){
    this.countryservice.insertCountry(country)
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
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.sportservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
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
