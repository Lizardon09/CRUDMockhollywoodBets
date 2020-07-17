import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';

@Component({
  selector: 'app-updatebettype',
  templateUrl: './updatebettype.component.html',
  styleUrls: ['./updatebettype.component.css']
})
export class UpdatebettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedbettype : IBettype;

  constructor(private bettypeservice : BettypeService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
  }

  disableButton(){
    if(this.selectedbettype.name){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedbettype.name = event.target.value;
    this.disableButton();
  }

  startUpdate(){
    this.updateBettype(this.selectedbettype);
  }
  
  updateBettype(bettype : IBettype){
    this.bettypeservice.updateBettype(bettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectBettype(bettype : any){
    this.selectedbettype = {...bettype};
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
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
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
