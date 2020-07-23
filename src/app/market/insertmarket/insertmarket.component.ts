import { Component, OnInit } from '@angular/core';
import { IMarket } from '../../services/market/market';
import { MarketService } from '../../services/market/market.service';
import { IBettype } from '../../services/bettype/bettype';
import { BettypeService } from '../../services/bettype/bettype.service';
import { IEvent } from '../../services/event/event';
import { EventService } from '../../services/event/event.service';
import { IMarketBettype } from '../../services/market/marketbettype';
import { IMarketBettypeInfo } from '../../services/market/marketbettypeinfo';
import { IOdd } from '../../services/market/odd';
import { IOddInfo } from '../../services/market/oddinfo';

@Component({
  selector: 'app-insertmarket',
  templateUrl: './insertmarket.component.html',
  styleUrls: ['./insertmarket.component.css']
})
export class InsertmarketComponent implements OnInit {

  bettypes : IBettype[] = [];
  markets : IMarket[] = [];
  marketbettypeinfos : IMarketBettypeInfo[] = [];
  oddinfos : IOddInfo[] = [];
  events : IEvent[] = [];
  successfulinsert = false;
  unsuccessfullinsert = false;
  disablebutton = true;
  disablemarketbettypeassociationbutton = true;
  disableoddbutton = true;
  namefield : string = "";
  mapmarketbettype : IMarket = {id:0,name:"Select Market"};
  mapbettype : IBettype = {id:0,name:"Select Bettype"};
  mapmarketbettypeinfo : IMarketBettypeInfo = {id:0,marketId:0,marketName:"Market",bettypeid:0,bettypeName:"Select Bettype:"};
  mapoddevent : IEvent = {id:0,tournamentId:0,name:"Select Event",date:new Date("01/01/2020 10:00:00")};
  odds : number = 0;

  constructor(private marketservice : MarketService, private bettypeservice : BettypeService, private eventservice : EventService) { }

  ngOnInit(): void {
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.eventservice.getEvents().subscribe(data=>this.events=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
  }

  disableButton(){
    if(this.namefield){
      this.disablebutton = false;
    }
    else{
      this.disablebutton = true;
    }
  }

  disableMarketBettypeAssociationButton(){
    if(this.mapbettype.id>0 && this.mapmarketbettype.id>0){
      this.disablemarketbettypeassociationbutton = false;
    }
    else{
      this.disablemarketbettypeassociationbutton = true;
    }
  }

  disableOddButton(){
    if(this.mapmarketbettypeinfo.id>0 && this.mapoddevent.id>0 && this.odds>0){
      this.disableoddbutton = false;
    }
    else{
      this.disableoddbutton = true;
    }
  }
  
  onNameKey(event){
    this.namefield = event.target.value;
    this.disableButton();
  }

  onMarketBettypeKey(market){
    this.mapmarketbettype = market;
    this.disableMarketBettypeAssociationButton();
  }

  onBettypeKey(bettype){
    this.mapbettype = bettype;
    this.disableMarketBettypeAssociationButton();
  }

  onOddsKey(event){
    this.odds = event.target.value;
    this.disableOddButton();
  }

  onMarketBettyptInfoKey(marketbettypeinfo){
    this.mapmarketbettypeinfo = marketbettypeinfo;
    this.disableOddButton();
  }

  onOddEventKey(event){
    this.mapoddevent = event;
    this.disableOddButton();
  }

  startInsert(){
    this.insertMarket({id:0,name:this.namefield});
  }

  startInserOdd(){
    this.insertOdd({id:0,marketbettypeid:this.mapmarketbettypeinfo.id,eventid:this.mapoddevent.id,odds1:this.odds});
  }

  startMarketBettypeMap(){
    this.mapMarketBettype({id:0,marketid:this.mapmarketbettype.id,bettypeid:this.mapbettype.id});
  }

  insertOdd(odd : IOdd){
    this.marketservice.insertOdd(odd)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
  }

  mapMarketBettype(marketBettype : IMarketBettype){
    this.marketservice.mapMarketBettype(marketBettype)
        .subscribe(data=>{
          console.log(data);
          this.waitForOneSecond().then((value)=>{
            this.insertResultStatus(data)
          })
        })
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
    this.mapmarketbettype = {id:0,name:"Select Market"};
    this.mapbettype = {id:0,name:"Select Bettype"};
    this.odds = 0;
    this.mapmarketbettypeinfo = {id:0,marketId:0,marketName:"Market",bettypeid:0,bettypeName:"Select Bettype:"};
    this.mapoddevent = {id:0,tournamentId:0,name:"Select Event",date:new Date("01/01/2020 10:00:00")};
    this.disableButton();
    this.disableMarketBettypeAssociationButton();
    this.disableOddButton();
    window.scrollTo(0,0);
    this.marketservice.getMarkets().subscribe(data=>this.markets=data);
    this.bettypeservice.getBettypes().subscribe(data=>this.bettypes=data);
    this.marketservice.getMarketBettypeInfo().subscribe(data=>this.marketbettypeinfos=data);
    this.eventservice.getEvents().subscribe(data=>this.events=data);
    this.marketservice.getOddInfo().subscribe(data=>this.oddinfos=data);
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
