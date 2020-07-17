import { Component, OnInit } from '@angular/core';
import { ICountry } from '../../services/country/country';
import { CountryService } from '../../services/country/country.service';

@Component({
  selector: 'app-deletecountry',
  templateUrl: './deletecountry.component.html',
  styleUrls: ['./deletecountry.component.css']
})
export class DeletecountryComponent implements OnInit {

  countries : ICountry[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private countryservice : CountryService) { }

  ngOnInit(): void {
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
  }

  deleteCountry(country : any){
    this.countryservice.deleteCountry(country)      
      .subscribe(data=>{
        console.log(data);
        this.waitForOneSecond().then((value)=>{
          this.deleteResultStatus(data)
        })
      });
  }

  deleteResultStatus(data : any){
    if(data.status=="Success"){
      this.successfulldelete = true;
      this.unsuccessfulldelete = false;
    }
    else if(data.status=="Cancelled"){
      return;
    }
    else{
      this.unsuccessfulldelete = true;
      this.successfulldelete = false;
    }
    window.scrollTo(0,0);
    this.countryservice.getCountries().subscribe(data=>this.countries=data);
  }

  closeSuccess(){
    this.successfulldelete = false;
    this.unsuccessfulldelete = false;
  }

  waitForOneSecond() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve("I promise to return after one second!");
      }, 300);
    });
  }

}
