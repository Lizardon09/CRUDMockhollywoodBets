import { Component, OnInit } from '@angular/core';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';
import { ISportCountry } from '../../services/associations/sportcountry';
import { ISportCountryInfo } from '../../services/associations/sportcountryinfo';


@Component({
  selector: 'app-updatesport',
  templateUrl: './updatesport.component.html',
  styleUrls: ['./updatesport.component.css']
})
export class UpdatesportComponent implements OnInit {

  countries : ICountry[] = [];
  sports : ISport[] = [];
  sportcountryinfos : ISportCountryInfo[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedsport : ISport;
  selectedsportcountry : ISportCountryInfo;

  constructor(private sportservice : SportService, private countryservice : CountryService) { }

  ngOnInit(): void {
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
    this.countryservice.getSportCountryInfo().subscribe(data=>this.sportcountryinfos=data);
  }

  disableButton(){
    if((this.selectedsport && this.selectedsport.name && this.selectedsport.logo) || this.selectedsportcountry){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedsport.name = event.target.value;
    this.disableButton();
  }

  onLogoKey(event){
    this.selectedsport.logo = event.target.value;
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
    this.updateSport(this.selectedsport);
  }

  startSportCountryUpdate(){
    this.updateSportCountry({sportcountryid:this.selectedsportcountry.id,sportid:this.selectedsportcountry.sportId,countryid:this.selectedsportcountry.countryId});
  }

  updateSport(sport : ISport){
    this.sportservice.updateSport(sport)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateSportCountry(sportcountry : any){
    this.sportservice.updateSportCountry(sportcountry)
    .subscribe(data=>{
      console.log(data);
      this.waitForOneSecond().then((value)=>{
        this.updateResultStatus(data)
      })
    })
}

  selectSport(sport : any){
    this.selectedsport = {...sport};
    this.selectedsportcountry = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectSportCountry(sportcountry : any){
    this.selectedsportcountry = {...sportcountry};
    this.selectedsport = null;
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
    this.sportservice.getSports().subscribe(data=>this.sports=data);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
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
