import { Component, OnInit } from '@angular/core';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';

@Component({
  selector: 'app-insertmarket',
  templateUrl: './insertmarket.component.html',
  styleUrls: ['./insertmarket.component.css']
})
export class InsertmarketComponent implements OnInit {

  markets : IMarket[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  namefield : string = "";

  constructor(private marketservice : MarketService) { }

  ngOnInit(): void {
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
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
    this.insertMarket({id:0,name:this.namefield});
  }

  insertMarket(market : IMarket){
    this.marketservice.insertMarket(market)
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
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
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
