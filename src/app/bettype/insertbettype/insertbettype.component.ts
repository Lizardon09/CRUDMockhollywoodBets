import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';

@Component({
  selector: 'app-insertbettype',
  templateUrl: './insertbettype.component.html',
  styleUrls: ['./insertbettype.component.css']
})
export class InsertbettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  namefield : string = "";

  constructor(private bettypeservice : BettypeService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
  }

  disableButton(){
    if(this.namefield){
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

  startInsert(){
    this.insertBettype({id:0,name:this.namefield});
  }

  insertBettype(bettype : IBettype){
    this.bettypeservice.insertBettype(bettype)
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
    this.disableButton();
    window.scrollTo(0,0);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
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
