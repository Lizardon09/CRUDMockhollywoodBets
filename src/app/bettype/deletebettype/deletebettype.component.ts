import { Component, OnInit } from '@angular/core';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';

@Component({
  selector: 'app-deletebettype',
  templateUrl: './deletebettype.component.html',
  styleUrls: ['./deletebettype.component.css']
})
export class DeletebettypeComponent implements OnInit {

  bettypes : IBettype[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private bettypeservice : BettypeService) { }

  ngOnInit(): void {
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
  }

  deleteBettype(bettype : any){
    this.bettypeservice.deleteBettype(bettype)      
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
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
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
