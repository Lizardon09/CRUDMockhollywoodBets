import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'app-updatecountry',
  templateUrl: './updatecountry.component.html',
  styleUrls: ['./updatecountry.component.css']
})
export class UpdatecountryComponent implements OnInit {

  countries : ICountry[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedcountry : ICountry;

  constructor(private countryservice : CountryService) { }

  ngOnInit(): void {
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
  }

  disableButton(){
    if(this.selectedcountry.name && this.selectedcountry.logo){
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

  startUpdate(){
    this.updateCountry(this.selectedcountry);
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

  selectCountry(country : any){
    this.selectedcountry = {...country};
    window.scrollTo(0,0);
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
