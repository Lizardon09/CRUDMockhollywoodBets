import { Component, OnInit } from '@angular/core';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { IMarketBettype } from '../../services/market/marketbettype';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';
import { IOdd } from '../../services/market/odd';
import { IOddInfo } from '../../services/market/oddinfo';
import { IEvent } from '../../services/event/event';
import { EventService } from '../../services/event/event.service';

@Component({
  selector: 'app-updatemarket',
  templateUrl: './updatemarket.component.html',
  styleUrls: ['./updatemarket.component.css']
})
export class UpdatemarketComponent implements OnInit {

  markets : IMarket[] = [];
  bettypes : IBettype[] = [];
  events : IEvent[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  oddinfos : IOddInfo[] = [];
  successfullupdate = false;
  unsuccessfullupdate = false;
  disablebutton = true;
  selectedmarket : IMarket;
  selectedmarketbettype : IMarketBettypeInfo;
  selectedodds : IOddInfo

  constructor(private marketservice : MarketService, private bettypeservice : BettypeService, private eventservice : EventService) { }

  ngOnInit(): void {
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.eventservice.getEvents().subscribe(data=>this.events=data);
  }

  disableButton(){
    if((this.selectedmarket && this.selectedmarket.name) || this.selectedmarketbettype || (this.selectedodds && this.selectedodds.odds)){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  onNameKey(event){
    this.selectedmarket.name = event.target.value;
    this.disableButton();
  }

  onMarketKey(market){
    this.selectedmarketbettype.marketId = market.id;
    this.selectedmarketbettype.marketName = market.name;
    this.disableButton();
  }

  onBettypeMarketKey(bettype){
    this.selectedmarketbettype.bettypeid = bettype.id;
    this.selectedmarketbettype.bettypeName = bettype.name;
    this.disableButton();
  }

  onOddsMarketBettyptInfoKey(marketbettype){
    this.selectedodds.marketBettypeId = marketbettype.id;
    this.selectedodds.marketName = marketbettype.marketName;
    this.selectedodds.bettypeName = marketbettype.bettypeName;
    this.disableButton();
  }

  onOddEventKey(event){
    this.selectedodds.eventId = event.id;
    this.selectedodds.eventName = event.name;
    this.disableButton();
  }

  onOddsKey(event){
    this.selectedodds.odds = event.target.value;
    this.disableButton();
  }

  startUpdate(){
    this.updateMarket(this.selectedmarket);
  }

  startMarketBettypeUpdate(){
    this.updateMarketBettype({id:this.selectedmarketbettype.id,marketid:this.selectedmarketbettype.marketId,bettypeid:this.selectedmarketbettype.bettypeid});
  }

  startUpdateOdd(){
    this.updateOdd({id:this.selectedodds.id,marketbettypeid:this.selectedodds.marketBettypeId,eventid:this.selectedodds.eventId,odds1:this.selectedodds.odds})
  }

  updateMarket(market : IMarket){
    this.marketservice.updateBettype(market)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateMarketBettype(marketbettype : IMarketBettype){
    this.marketservice.updateMarketBettype(marketbettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  updateOdd(odd : IOdd){
    this.marketservice.updateOdd(odd)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.updateResultStatus(data)
          })
        })
  }

  selectMarket(market : any){
    this.selectedmarket = {...market};
    this.selectedodds = null;
    this.selectedmarketbettype = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectOdd(odd : any){
    this.selectedodds = {...odd};
    this.selectedmarket = null;
    this.selectedmarketbettype = null;
    window.scrollTo(0,0);
    this.disablebutton = true;
  }

  selectMarketBettype(marketbettype : any){
    this.selectedmarketbettype = {...marketbettype};
    this.selectedmarketbettype.bettypeid = marketbettype.bettypeId;
    this.selectedmarket = null;
    this.selectedodds = null;
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
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.eventservice.getEvents().subscribe(data=>this.events=data);
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
