import { Component, OnInit } from '@angular/core';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';

@Component({
  selector: 'app-updatesport',
  templateUrl: './updatesport.component.html',
  styleUrls: ['./updatesport.component.css']
})
export class UpdatesportComponent implements OnInit {

  sports : ISport[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedsport : ISport;

  constructor(private sportservice : SportService) { }

  ngOnInit(): void {
    this.sportservice.getSports().subscribe(data=>this.sports=data);
  }

  disableButton(){
    if(this.selectedsport.name && this.selectedsport.logo){
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

  startUpdate(){
    this.updateSport(this.selectedsport);
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

  selectSport(sport : any){
    this.selectedsport = {...sport};
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
    this.sportservice.getSports().subscribe(data=>this.sports=data);
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
