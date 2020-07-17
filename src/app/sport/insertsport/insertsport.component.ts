import { Component, OnInit } from '@angular/core';
import { ISport } from '../../services/sport/sport';
import { SportService } from '../../services/sport/sport.service';

@Component({
  selector: 'app-insertsport',
  templateUrl: './insertsport.component.html',
  styleUrls: ['./insertsport.component.css']
})
export class InsertsportComponent implements OnInit {

  sports : ISport[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  namefield : string = "";
  logofield : string = "";

  constructor(private sportservice : SportService) { }

  ngOnInit(): void {
    this.sportservice.getSports().subscribe(data=>this.sports=data);
  }

  disableButton(){
    if(this.namefield && this.logofield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
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
    this.insertSport({id:0,name:this.namefield,logo:this.logofield});
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
    this.disableButton();
    window.scrollTo(0,0);
    this.sportservice.getSports().subscribe(data=>this.sports=data);
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
