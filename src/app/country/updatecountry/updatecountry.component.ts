import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';
import { ISport } from 'src/app/services/sport/sport';
import { SportService } from 'src/app/services/sport/sport.service';
import { ISportCountry } from '../../services/associations/sportcountry';
import { ISportCountryInfo } from '../../services/associations/sportcountryinfo';

@Component({
  selector: 'app-updatecountry',
  templateUrl: './updatecountry.component.html',
  styleUrls: ['./updatecountry.component.css']
})
export class UpdatecountryComponent implements OnInit {

  countries : ICountry[] = [];
  sports : ISport[] = [];
  sportcountryinfos : ISportCountryInfo[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedcountry : ICountry;
  selectedsportcountry : ISportCountryInfo;

  constructor(private countryservice : CountryService, private sportservice : SportService) { }

  ngOnInit(): void {
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  disableButton(){
    if((this.selectedcountry && this.selectedcountry.name && this.selectedcountry.logo) || this.selectedsportcountry){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedcountry.name = event.target.value;
    this.disableButton();
  }

  onLogoKey(event){
    this.selectedcountry.logo = event.target.value;
    this.disableButton();
  }

  onSportKey(sport){
    this.selectedsportcountry.sportId = sport.id;
    this.selectedsportcountry.sportName = sport.name;
    this.disableButton();
  }

  onSportCountryKey(country){
    this.selectedsportcountry.countryId = country.id;
    this.selectedsportcountry.countryName = country.name;
    this.disableButton();
  }

  startUpdate(){
    this.updateCountry(this.selectedcountry);
  }

  startSportCountryUpdate(){
    this.updateSportCountry({sportcountryid:this.selectedsportcountry.id,sportid:this.selectedsportcountry.sportId,countryid:this.selectedsportcountry.countryId});
  }

  updateCountry(country : ICountry){
    this.countryservice.updateCountry(country)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateSportCountry(sportcountry : any){
        this.countryservice.updateSportCountry(sportcountry)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectCountry(country : any){
    this.selectedcountry = {...country};
    this.selectedsportcountry = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectSportCountry(sportcountry : any){
    this.selectedsportcountry = {...sportcountry};
    this.selectedcountry = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  updateResultStatus(data : any){
    if(data.status=="Success"){
      this.successfullupdate = true;
      this.unsuccessfullupdate = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfullupdate = true;
      this.successfullupdate = false;
    }
    this.disableButton();
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  closeSuccess(){
    this.successfullupdate = false;
    this.unsuccessfullupdate = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
