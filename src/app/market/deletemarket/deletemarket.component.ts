import { Component, OnInit } from '@angular/core';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';
import { IOddInfo } from '../../services/market/oddinfo';

@Component({
  selector: 'app-deletemarket',
  templateUrl: './deletemarket.component.html',
  styleUrls: ['./deletemarket.component.css']
})
export class DeletemarketComponent implements OnInit {

  markets : IMarket[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  oddinfos : IOddInfo[] = [];
  successfulldelete = false;
  unsuccessfulldelete = false;

  constructor(private marketservice : MarketService) { }

  ngOnInit(): void {
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
  }

  deleteMarket(market : any){
    this.marketservice.deleteMarket(market)      
      .subscribe(data=>{
        console.log(data);
        this.waitForOneSecond().then((value)=>{
          this.deleteResultStatus(data)
        })
      });
  }

  deleteMarketBettype(marketbettypeinfo : any){
    this.marketservice.deleteMarketBettype(marketbettypeinfo)      
    .subscribe(data=>{
      console.log(data);
      this.waitForOneSecond().then((value)=>{
        this.deleteResultStatus(data)
      })
    });
  }

  deleteOdd(oddinfo : any){
    this.marketservice.deleteOdd(oddinfo)      
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
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
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
