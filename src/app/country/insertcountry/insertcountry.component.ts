import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'app-insertcountry',
  templateUrl: './insertcountry.component.html',
  styleUrls: ['./insertcountry.component.css']
})
export class InsertcountryComponent implements OnInit {

  countries : ICountry[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  namefield : string = "";
  logofield : string = "";

  constructor(private countryservice : CountryService) { }

  ngOnInit(): void {
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
  }

  disableButton(){
    if(!this.namefield || !this.logofield){
      this.disablebutton = true;
    }
    else{
      this.disablebutton = false;
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

  startInsert(){
    this.insertCountry({id:0,name:this.namefield,logo:this.logofield});
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
    this.disableButton();
    window.scrollTo(0,0);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
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
